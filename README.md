# Docker Tutorial and Demo with nodejs app

## 1) Docker - Overview
- Docker is a container management service.
- The whole idea of Docker is for developers to easily develop applications, ship them into containers which can then be deployed anywhere.
- The official site for Docker is https://www.docker.com/ The site has all information and documentation about the Docker software.

## 2) Components of Docker 
- **Docker for various OS**: It allows one to run Docker containers on the various OS i.e. Windows, Linux etc.
- **Docker Engine**: It is used for building Docker images and creating Docker containers.
- **Docker Hub**: This is the registry which is used to host various Docker images.
- **Docker Compose**: This is used to define applications using multiple Docker containers.

## 3) Docker - Hub
- Docker Hub is a registry service on the cloud that allows you to download Docker images that are built by other communities.
- You can also upload your own Docker built images to Docker hub.
- The official site for Docker hub is - https://hub.docker.com/

## 4) Docker - Service Start/Stop
- To start the Docker daemon process: `service docker start`
- To stop the Docker daemon process: `service docker stop`

## 5) Docker - Images
- Docker Image is a read-only (immutable) file that contains the source code, libraries, dependencies, tools, and other files needed for an application to run.
- To create a docker image, we write a Docker file with all of our requirements and perform a docker build command to get a Docker Image. This image is now ready to run as a Docker Container on successful creation.
- **Docker File** -> BUILD -> **Docker Image** -> RUN -> **Docker Container**
- **Download Image Command**: Ex: node image
```
docker pull node
```
- **Run Image Command**: Ex: node image
```
docker run -it node /bin/bash
```
- **Note**: In above command, 
    - `-it` is used to mention that we want to run in **interactive mode**.
    - `/bin/bash` is used to run the bash shell once node is up and running.
- **Displaying Docker Images Command**: To see the list of Docker images on the system
```
docker images
```
- From the above command's output, each image has the following attributes:
    - REPOSITORY - This is the name of the Image. `Ex.: node`
    - TAG - This is used to logically tag images. `Ex.: latest`
    - IMAGE ID - This is used to uniquely identify the image. `Ex.: b612cbc8128d`
    - CREATED - The number of days since the image was created. `Ex.: 12 days ago`
    - SIZE - The size of the image. `Ex.: 1.1GB`
- **Removing Docker Images**: To remove the Docker images on the system use `docker rmi IMAGE_ID` command.
```
docker rmi b612cbc8128d
```
- **See the details of an image or container**: `docker inspect Repository`
```
docker inspect node
```

## 6) Docker - Containers
- Containers are instances of Docker images that can be run using the Docker run command.
- The basic purpose of Docker is to run containers.
- **Running a Container**: Running of containers is managed with the Docker `run` command. To run a container in an interactive mode:
```
docker run -it node /bin/bash
```
- **Note**: In above command, 
    - `-it` is used to mention that we want to run in **interactive mode**.
    - `/bin/bash` is used to run the bash shell once node is up and running.
- **Listing of Containers**: We can list all of the containers on the machine via the `docker ps` command.
- To list the `currently running` containers on the system:
```
docker ps
```
- Above command will return,
    - CONTAINER ID
    - IMAGE
    - COMMAND
    - CREATED
    - STATUS
    - PORTS
    - NAMES
- To list `all` of the containers on the system:
```
docker ps -a
```
- **Docker History**: To see all the commands that were run with an image via a container, use `docker history ImageID`.
```
docker history node
```
- **Docker Top Process**: To see the top processes within a container, use `docker top ContainerID/Name`
- **Docker Stop Container**: To stop a running container, use `docker stop ContainerID/Name`
- **Docker Delete Container**: To delete a container, use `docker rm ContainerID/Name`. If container is in use then we can use `-f` to delete it forcefully i.e. `docker rm ContainerID/Name -f`.
- **Docker Container Stats**: To see the statistics of a running container, use `docker stats ContainerID/Name`
- **Docker Attach Container**: To attach to a running container, use `docker attach ContainerID/Name`
- **Docker Pause Container**: To pause the processes in a running container, use `docker pause ContainerID/Name`
- **Docker Unpause Container**: To unpause the processes in a running container, use `docker unpause ContainerID/Name`
- **Docker Kill Process**: To kill the processes in a running container., use `docker kill ContainerID/Name`

## 7) Docker – Container Lifecycle
- Initially, the Docker container will be in the `created` state.
- Then the Docker container goes into the `running` state when the Docker `run` command is used.
- The Docker `kill` command is used to kill an existing Docker container.
- The Docker `pause` command is used to pause an existing Docker container.
- The Docker `stop` command is used to stop an existing Docker container.
- The Docker `run` command is used to put a container back from a `stopped` state to a `running` state.

## 8) Docker - File
- A `dockerfile` is a text document that contains commands that are used to assemble an image.
- So using dockerfile, we can create our own Docker images.
- We can use any command that call on the command line.
- Docker builds images automatically by reading the instructions from the dockerfile.
- To create dockerfile, simply create new file with name `dockerfile` without any extension.
- Example of dockerfile instructions:
```
FROM node:latest
LABEL vendorl="Ravi Patel"
#WORKDIR /app
#COPY . ./app
COPY . .
RUN npm install
EXPOSE 1000
CMD [ "node", "index.js" ] 
```
- Listing some commonly used instructions:
    - **FROM**:
        - Syntax = `FROM node:latest`
        - This instruction is used to set the Base Image for the subsequent instructions. A valid dockerfile must have FROM as its first instruction.
    - **LABEL**:
        - Syntax = `LABEL vendorl="Ravi Patel"`
        - We can add labels to an image to organize images of our project. We need to use LABEL instruction to set label for the image.
    - **WORKDIR**:
        - Syntax = `WORKDIR /var/www/html`
        - It is used to set the working directory for any RUN, CMD and COPY instruction that follows it in the Dockerfile.
        - If work directory does not exist, it will be created by default.
        - We can use WORKDIR multiple times in a dockerfile.
    - **COPY**:
        - Syntax = `COPY source/ /destination`
        - This instruction is used to copy new files or directories from source to the filesystem of the container at the destination.
        - The source path must be inside the context of the build.
        - We cannot COPY ../something /something because the first step of a docker build is to send the context directory (and subdirectories) to the docker daemon.
        - If source is a directory, the entire contents of the directory are copied including filesystem metadata.
    - **RUN**:
        - Syntax = `RUN npm install`
        - This instruction is used to execute any command of the current image.
    - **CMD**:
        - Syntax = `CMD ["executable", "param1", "param2"?]`
        - This is used to execute application by the image. We should use CMD always in the following form.
        - This is preferred way to use CMD.
        - There can be only one CMD in a dockerfile.
        - If we use more than one CMD, only last one will execute.

## 9) Docker - Building own image
- To build our own docker images, we can use `docker build` command.
- Syntax: `docker build -t ImageName:TagName Dir`
    - **-t** : This is to mention a tag to the image.
    - **ImageName** : This is the name you want to give to our image.
    - **TagName** : This is the tag you want to give to our image.
    - **Dir** : The directory where the Docker File is present. Use `.` for current directory.
- Ex.
```
docker build -t my-node-app-image:latest .
```

## 10) Docker - Managing Ports
- In Docker, the containers themselves can have applications running on ports.
- When we run a container, if we want to access the application in the container via a port number, we need to map the port number of the container to the port number of the `Docker host`.
- To check what ports are exposed by the container, we should use the `docker inspect` command to inspect the image.
```
docker inspect my-node-app-image
```
- The output of the inspect command gives a JSON output. If we observe the output, we can see that there is a section of `ExposedPorts` and see that there are one ports mentioned as below:
```
"ExposedPorts": {
    "1000/tcp": {}
},
```
- To run our image `my-node-app-image` and map the ports, we need to change the docker run command and add the `p` option which specifies the port mapping. So, we need to run the following command:
```
docker run -p 1000:1000 my-node-app-image 
```
- In above command, The left-hand side of the port number mapping is the ***Docker Host Port*** to map to and the right-hand side is the ***Docker Container Port*** number.
- **Note**: To run container with custom name, we need to run the following command:
```
docker run --name my-node-app-container -p 1000:1000 my-node-app-image:latest
```

## 11) Docker Ignore File
- Similar to a `.gitignore` file, a `.dockerignore` files allows us to mention a list of files and/or directories which we might want to ignore while building the image.
- This would definitely reduce the size of the image and also help to speed up the docker build process.
- .dockerignore file can have content like below:
```
#Ignore the logs directory
logs/

#Ignoring the password file
passwords.txt

#Ignoring git and cache folders
.git
.cache

#Ignoring all the markdown and class files
*.md
```

## 12) Docker Image Versioning/Tagging
- Versioning of Docker images is an important part of the process, as it allows us to track changes and roll back to previous versions if needed.
- A tag/version is essentially a label assigned to a Docker image to help identify it. It typically consists of two components:
    - **Image name (also known as repository name)**: This is the name of the image.
    - **Tag**: This is an optional identifier, commonly used to represent a specific version or variant of the image. If no tag is specified, Docker automatically assigns the latest tag to the image by default (more on this later).
- For instance, consider the tag `Ubuntu:18.04`. In this case, `Ubuntu` is the name of the Docker image, and `18.04` is the tag representing a specific version of Ubuntu. By using this tag, we can pull or run this specific version of the Ubuntu Docker image.
- Following are the ways to tag a Docker image:
    1) Tag a Docker image during the build process
    ```
    docker build -t my-node-app-image:1.0.0 .
    ```
    2) Tag a Docker image after the build process
    ```
    docker image tag my-node-app-image:1.0.0 my-node-app-image:beta
    ```
    3) Tag a Docker image for Docker Hub
    ```
    docker push <DOCKER_HUB_USERNAME/IMAGE_NAME[:tag]>
    ```
    4) Build an image with multiple Docker tags
    ```
    docker build -t my-node-app-image:1.0.0 -t my-node-app-image:beta .
    ```
- Understanding the "latest" image tag:
    - If we assign a tag without including the optional tag then docker will assign `latest` tag automatically.
    - Ex: `docker image tag my-node-app-image`
    - However, the latest tag can be misleading.
    - Some repositories use this tag to refer to the most up-to-date stable version, but it might not be true for all repositories.
    - So, it's important to remember that `latest` is just a tag, like any other tag.
    - It doesn’t carry any particular meaning.
    - It's simply a default tag assigned to an image when no other tag is specified.

## 13) Delete All Docker Images & Container
- Docker provides a single command that will clean up any resources - images, containers, volumes, and networks - that are dangling (not associated with a container):
```
docker system prune
```
- To additionally remove any stopped containers and all unused images (not just dangling images), add the -a flag to the command:
```
docker system prune -a
```

## 14) Docker - Mount
- Mount is another way to give containers access to files and folders on our host.
- We can share data between host to container without creating docker volume by directly mounting host directory to container directory.
- Any changes made to the directory will be reflected on both sides of the mount, whether the modification originates from the host or within the container.
- Mounts are best used for ad-hoc storage on a short-term basis.
- Syntax:
```
docker run -itd --name my-node-app-c1 -p 1000:1000 -v F:\xampp\htdocs\docker-node-app:/app node
docker exec -it my-node-app-c1 bash
```

## 15) Docker - Volumes
- Changes made to a container's environment are lost when the container stops, crashes, or gets replaced.
- We can Dockerize stateful applications such as databases and file servers by attaching **volumes** to our containers.
- **Volumes** provide persistent storage that's independent of individual containers.
- We can reattach volumes to a different container after a failure or use them to share data between several containers simultaneously.
- **Volumes** are a mechanism for storing data outside containers, means storing and managing data separately from container itself and ensuring that the data persists even if the container is stopped or deleted.
- A Docker Volums is essentially a directory or a mount point located outside the container's file system, which is mapped to a specfic path within the container.
- This mapping enables the container to read from or write to the volume as if it were a regular directory withing the container.
- It is independent and can be associated with one or more containers.
- Bind Mounts vs. Docker Volumes
    - **Volumes** are a better solution when we are providing permanent storage to operational containers.
    - Because they are managed by Docker, we don't need to manually maintain directories on our host.
    - There is a less chance of data being accidentally modified and no dependency on a particular folder structure.
- Create a volume:
    - Syntax: 
    ```
    docker volume create [OPTIONS] [VOLUME]
    ```
    - Example:
    ```
    docker volume create myvol
    ```
- Display detailed information on one or more volumes:
    - Syntax: 
    ```
    docker volume inspect [OPTIONS] VOLUME [VOLUME...]
    ```
    - Example:
    ```
    docker volume inspect myvol
    ```
- Display list of volumes:
    - Syntax: 
    ```
    docker volume ls [OPTIONS]
    ```
- Remove all *unused* local volumes:
    - Syntax: 
    ```
    docker volume prune [OPTIONS]
    ```
- Remove one or more volumes:
    - Syntax: 
    ```
    docker volume rm [OPTIONS] VOLUME_NAME [VOLUME_NAME...]
    ```
    - Example:
    ```
    docker volume rm myvol
    ```
- Create container and volume if volume does not exists:
    - Syntax:
    ```
    docker run -d --name CONTAINER_NAME -v VOLUME_NAME:/app IMAGE_NAME
    ```
    - Example:
    ```
    docker run -d --name mycont -v myvol:/app myimage
    ```
    - To create read-only volume:
    ```
    docker run -d --name CONTAINER_NAME -v VOLUME_NAME:/app:ro IMAGE_NAME
    ``` 
- We can share data between host to container without creating docker volume by directly mounting host directory to container directory.
    - Syntax:
    ```
    docker run -itd --name <CONTAINER_NAME> -p <DOCKER_HOST_PORT>:<DOCKER_CONTAINER_PORT> -v <ABSOLUTE_PATH>:<VOLUME_FOLDER> <IMAGE_NAME>
    ```
    ```
    docker run -itd --name mycontainer -p 1000:1000 --rm -v F:\demo\docker-demo-node-app:/app myimage
    ```

## 16) Docker - Volume with Dockerfile
- The `Volume` created from the dockerfile tells docker to create a mount point for a volume inside the container.
```
FROM ubuntu
VOLUME [ "/data" ]
```
- It specify that the directory mentioned in the dockerfile for the volume i.e. "/data" should be treated as `Volume`. 
- It means that any data written to or read from the "/data" directory within the container will be stored outside the container in a volume.
- *Note that the "VOLUME" instruction in the dockerfile does not create the volume itself.*
- It merely sets up the mount point within the container.
- The actual volume created when we run the container and specify a volume or path using the "-v" flag.
- Example: create dockerfile as mentioned above and run below command to create volume using the dockerfile.
```
docker build -t myimage
docker run --name c1 -itd -v myvolume:/data myimage
```

## 17) Docker - Networking
- Docker networking is a fundamental aspect of Docker that enables communication between Docker container and external networks.
- It allows us to connect containers together, as well as connect containers to the host machine and other external resources.
- A container has no information about what kind of network it is attached to or whether their peers are also Docker workloads or not.
- A container only sees a network interface with an IP address, a gateway, a routing table, DNS services and other networking details.
- By default when we create or run a container using `docker create` or `docker run`, the container does not expose any of its ports to the outside world.
- We can make a port available to service outside of Docker by using `--publish` or `-p` flag.
- Network Drivers
    - Bridge Network:
        - Default Bridge Nework:
            - It is good for running containers that does not require special networking capabilities.
            - It uses a software bridge which allows containers connected to the same bridge network to communicate, while providing isolation from containers which are not connected to that bridge network.
            - The Docker bridge driver automatically installs rules in the host machine so that containers on different bridge networks can not communicate directly with each other.
            - It apply to containers running on the same Docker daemon host.
            - When we start Docker, a default bridge (also called Bridge) is created automatically and newly-started containers connect to it unless otherwise specified.
            - Containers can communicate to each others.
            - Container and Host can communicate via Bridge.
            - Containers can only communicate by IP address, not by container name. 
        - User Define Bridge Network:
            - It enable containers on the same docker host to communicate with each other.
            - It typically defines an isolated network for multiple containers belonging to a common project or component.
            - It is possible to achieve isolation of container.
            - For example, C1 and C2 containers are communicates with each other and with host via Default Bridge, C3 and C4 are connected via User Defined Bridge Network (Net1) then C3 or C4 can not communicate C1 and C2 but it can communicate to Host via User Defined Bridge Network (Net1).
            - Containers can communicate by IP address and also resolve a container name to an IP address. This capability is called `Automatic Service Discovery`. 
    - Host Network:
        - It shares the host's network with the container. When we use this driver, the container's network is not isolated from the host.
    - Overlay Network:
        - It enable communication between docker containers running on different hosts.
        - They are particularly useful in distributed or clustered setups where containers span multiple machines.
        - It requires a container orchestration tool, such as Docker Swarm or Kubernetes, to manage the networks across mutiple hosts.
    - MACVLAN Network:
        - It used when we are migrating from a VM setup or need our container to look like physical hosts on our network, each with unique MAC address.
    - IPVLAN Network:
        - It is similar to MACVLAN network, but does not assign unique MAC addresses to containers. We can consider to use IPVLAN Network when there is a restriction on the number of MAC addresses that can be assigned to a network interface or port.
    - None:
        - No networking.
    - Network Plugins:
        - It is 3rd party plugins which provide us network driver stacks.
- Docker Nerwork Commands:
    - `docker network ls`: List all networks. Bridge is the default network.
    - `docker network inspect bridge`: Inspect bridge network to see what containers are connected to it.
    - `docker network create --driver bridge NETWORK_NAME`: Create user defined-bridge network.
    - `docker network inspect NETWORK_NAME`: Inspect network.
    - `docker run --name CONTAINER_NAME -itd --network NETWORK_NAME python`: Connect container to a specified network e.g. host, user-defined bridge.
    - `docker network connect CONTAINER_NAME NETWORK_NAME`: Connect a running container to an existing user-defined bridge.
    - `docker network disconnect CONTAINER_NAME NETWORK_NAME`: Disconnect a running container to an existing user-defined bridge.
    - `docker network rm NETWORK_NAME`: Delete specified network.

## 18) Docker - Compose - Overview
- Docker Compose is a tool for defining and running multi-container Docker applications.
- Information describing the services and networks for an application are contained within a *YAML* file, called `docker-compose.yml`.
- Docker Compose is used for running multiple containers as a single service.
- Each of the containers here run in isolation but can interact with each other when required.
- Docker Compose files are very easy to write in a scripting language called *YAML*, which is an XML-based language that stands for **Yet Another Markup Language**.
- Another great thing about Docker Compose is that users can activate all the services (containers) using a single command.
- Benefits of Docker Compose:
    - Single host deployment - This means you can run everything on a single piece of hardware.
    - Quick and easy configuration - Due to YAML scripts.
    - High productivity - Docker Compose reduces the time it takes to perform tasks.
    - Security - All the containers are isolated from each other, reducing the threat landscape.
- Basic Commands in Docker Compose:
    - `docker compose version`: It is used to check the version of Docker Compose.
    - `docker compose --help`: Check other available commands.
    - `docker compose up`: It will take the *docker-compose.yml* file and start building containers. It will download/pull required images and create/start required containers. If we modify *docker-compose.yml* file and again run *docker compose up* command then it will only recreate modified containers.
    - `docker compose up -d`: It is same as *docker compose up* command but it will run in the background which means it will not occupy terminal.
    - `docker compose ps`: It is used list currently running services.
    - `docker compose exec my_serice_name mysql -u root -p`: It is used to get access the terminal of container. 
    - `docker compose stop`: It is used to stop compose started using *docker compose up -d* command.
    - `docker compose down`: It is used to remove containers entirely. It will not remove volumes.
    - `docker compose down --volume `: It is used to remove containers entirely including volumes.
- Other commands using *docker compose --help*:
    - `attach`:      Attach local standard input, output, and error streams to a service's running container
    - `build`:       Build or rebuild services
    - `config`:      Parse, resolve and render compose file in canonical format
    - `cp`:          Copy files/folders between a service container and the local filesystem
    - `create`:      Creates containers for a service
    - `down`:        Stop and remove containers, networks
    - `events`:      Receive real time events from containers
    - `exec`:        Execute a command in a running container
    - `images`:      List images used by the created containers
    - `kill`:        Force stop service containers
    - `logs`:        View output from containers
    - `ls`:          List running compose projects
    - `pause`:       Pause services
    - `port`:        Print the public port for a port binding
    - `ps`:          List containers
    - `pull`:        Pull service images
    - `push`:        Push service images
    - `restart`:     Restart service containers
    - `rm`:          Removes stopped service containers
    - `run`:         Run a one-off command on a service
    - `scale`:       Scale services
    - `start`:       Start services
    - `stats`:       Display a live stream of container(s) resource usage statistics
    - `stop`:        Stop services
    - `top`:         Display the running processes
    - `unpause`:     Unpause services
    - `up`:          Create and start containers
    - `version`:     Show the Docker Compose version information
    - `wait`:        Block until the first service container stops
    - `watch`:       Watch build context for service and rebuild/refresh containers when files are updated