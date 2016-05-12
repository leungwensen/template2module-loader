
# grouped tasks
make:
	make install
	make test
all:
	make preinstall
	make
	make publish

# tasks
preinstall:
	npm  install -g cnpm --registry=http://registry.npm.taobao.org
install:
	cnpm install
	npm install
publish:
	npm publish
	cnpm sync template2module-loader

