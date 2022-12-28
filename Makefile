deploy:
	npm run build
	mkdir -p target
	cp build/static/css/main.*.css target/main.css
	cp build/static/js/main.*.js target/main.js
	node deploy.js