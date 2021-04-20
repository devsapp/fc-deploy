
lint:
	npm i && npm run fix && npm run lint && npm run build



dev: lint
	git add .;\
	npm run dev

ci: lint
	git add .;\
	git-cz