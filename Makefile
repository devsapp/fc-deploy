
lint:
	npm run fix && npm run lint


dev: lint
	git add .;\
	npm run build;\
	npm i;\
	npm run dev