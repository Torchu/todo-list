# TO DO List
## Running the code
To run the code, you just need to run the following command:
```bash
make run
```

It will install the dependecies and run the **docker** container with the application.

I wholeheartedly recommend using **docker** to run the application. Using a container will prevent you from having to install the dependencies on your machine and will ensure that everyone is always using the same environment.

However, if you don't want to use docker, you can use:
```bash
make run-local
```
To install and run the application locally.

### Only build the application
If you want to only build the application, but not run it, you can use:
```bash
make build
```
or
```bash
make build-local
```


### Linter
This application uses **ESLint** to ensure the code quality and standardization. To run the linter, you can use:
```bash
make lint
```
or
```bash
make lint-local
```

### Test suite
This application uses **Jest** for unit testing. To run the tests, you can use:
```bash
make test
```
or
```bash
make test-local
```

## Design
### Architecture
This application uses the **Clean Architecture** and **Domain Driven Design**. The main idea is to separate the application into three different layers, each one with its own responsibilities.

![Clean Architecture](https://res.cloudinary.com/practicaldev/image/fetch/s--T7GIdw6s--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://miro.medium.com/max/1488/1*D1EvAeK74Gry46JMZM4oOQ.png)

Each layer can only depend on the inner layers. E.g. The domain layer can only depend on itself, the application layer can only depend on the domain layer, and the infrastructure layer can depend on both the application and the domain layer.

Doing so, we can ensure that the application is decoupled and that each layer is responsible for its own tasks. In case we need to change the database, for example, we can do it without having to change the whole application.


#### Domain layer
This layer is responsible for the business rules. It is the core of the application and it should not depend on any other layer. It is also the most stable layer, since it is the one that contains the business rules.

It includes the definition of the **Task** class, the **TaskRepository** interface, that defines what a repository should be, and some other types that are used by the application.

#### Application layer
This layer is responsible for the application logic. It is the layer that connects the domain layer to the infrastructure layer. It is also the layer that contains the use cases.

In this layer we can find the different functions that represents the use cases of the application. For example, the **createTask** function, that is responsible for creating a new task.

To connect to the persistance file (infrastructure layer) we use the **TaskRepository** interface, defined in the domain layer and we invert the control of the dependencies, so the application layer does not depend on the infrastructure layer. Instead, the infrastructure layer injects the dependencies into the application layer and can be easily replaced.

#### Infrastructure layer
This layer is responsible for the connection between the application and the external sources, such us the user inputs and the persistance file.

In this layer we can find the **TaskController** which is the gateway between the user and the application. It is responsible for receiving the user inputs and calling the application layer.

We can also find the **TaskJsonRepository** which is the implementation of the **TaskRepository** interface. It is responsible for reading and writing the tasks to the persistance file.