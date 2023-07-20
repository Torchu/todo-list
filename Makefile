# Using docker
build:
	docker-compose build

run: build
	docker-compose run -i app

lint: build
	docker-compose run lint

test: build
	docker-compose run test

clean:
	docker-compose down --rmi all --volumes --remove-orphans

# Using local
build-local:
	npm ci

run-local: build-local
	npm run dev

lint-local: build-local
	npm run lint

test-local: build-local
	npm run test
