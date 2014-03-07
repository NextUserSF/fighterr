NODE_MODULES = $(CURDIR)/node_modules
GIT_DIR = $(CURDIR)/$(shell git rev-parse --git-dir)
GIT_HOOKS = $(GIT_DIR)/hooks
GIT_HOOKS_REPO = git@github.com:thelinuxlich/git-hooks.git
JSHINT = $(NODE_MODULES)/.bin/jshint --reporter $(NODE_MODULES)/jshint-stylish/stylish.js
JSCS = $(NODE_MODULES)/.bin/jscs

SRC_DIR = $(CURDIR)/src
SRC_FILES := $(shell find $(SRC_DIR) -name '*.js')

ifeq (deploy-prod,$(firstword $(MAKECMDGOALS)))
  NEW_VERSION := `git describe --tags master | gawk -F. '{$$NF = $$NF + 1;} 1' | sed 's/ /./g'`
endif

# Show this help message
help:
	@awk 'BEGIN{print "\nMakefile usage:\n"};/^[^#[:space:]\.].*:/&&$$0!~/=/{split($$0,t,":");printf("%8s %-16s %s\n","make",t[1],x);x=""};/^#/{gsub(/^# /,"");x=$$0;if(x!="")x="- "x};END{printf "\n"}' Makefile

# Install hooks
install-hooks:
	@echo Installing git hooks...
	@rm -rf git-hooks
	@git clone $(GIT_HOOKS_REPO)
	@cd git-hooks; ${MAKE} DESTDIR=$(GIT_HOOKS) || exit; cd ..

# Check files with JSHint and JSCS
lint: .lint

.lint: $(SRC_FILES)
	@echo "Checking files with JSHint and JSCS..."
	@find $(SRC_DIR) -name "*.js" -print0 | xargs -0 $(JSHINT)
	@find $(SRC_DIR) -name "*.js" -print0 | xargs -0 $(JSCS)

.PHONY: \
    lint \
    install-hooks \
    help \
