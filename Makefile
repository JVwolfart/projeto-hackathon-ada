INFO = [ INFO ]
REMOVE_OUTPUT = >/dev/null 2>/dev/null
KEEP_ON_ERROR = || true

SOURCE_DIR = src

DOCKER_COMPOSE = docker-compose
DOCKER = docker
XARGS = xargs

.DEFAULT_GOAL := all

.PHONY: all clean fclean re
.PHONY: up down
.PHONY: rm stop_containers rm_containers rm_volumes rm_networks rm_images
.PHONY: ls ls_containers ls_volumes ls_networks ls_images
.PHONY: sudo init install set_host

################################################################################
# Basic Rules

all: up

clean: down

fclean: clean rm

re: fclean all

################################################################################
# Docker Rules

up: sudo set_host
	@echo $(INFO) "Starting Docker containers"
	@sudo $(DOCKER_COMPOSE) up --build $(KEEP_ON_ERROR)
	@echo $(INFO) "Docker containers stopped"

down: sudo
	@echo $(INFO) "Stopping Docker containers"
	@sudo $(DOCKER_COMPOSE) down $(REMOVE_OUTPUT) $(KEEP_ON_ERROR)

################################################################################
# Docker Clean Rules

rm: stop_containers rm_containers rm_volumes rm_networks rm_images

stop_containers: sudo
	@echo $(INFO) "Stopping all Docker containers"
	@sudo $(DOCKER) ps --all --quiet | $(XARGS) $(DOCKER) stop \
	$(REMOVE_OUTPUT) $(KEEP_ON_ERROR)

rm_containers: sudo
	@echo $(INFO) "Removing all Docker containers"
	@sudo $(DOCKER) ps --all --quiet | $(XARGS) $(DOCKER) rm \
	$(REMOVE_OUTPUT) $(KEEP_ON_ERROR)

rm_volumes: sudo
	@echo $(INFO) "Removing all Docker volumes"
	@sudo $(DOCKER) volume ls --quiet | $(XARGS) $(DOCKER) volume rm \
	$(REMOVE_OUTPUT) $(KEEP_ON_ERROR)

rm_networks: sudo
	@echo $(INFO) "Removing all Docker networks"
	@sudo $(DOCKER) network prune --force $(REMOVE_OUTPUT) $(KEEP_ON_ERROR)

rm_images: sudo
	@echo $(INFO) "Removing all Docker images"
	@sudo $(DOCKER) rmi --force $$(sudo $(DOCKER) images --all --quiet) \
	$(REMOVE_OUTPUT) $(KEEP_ON_ERROR)

################################################################################
# Docker List Rules

ls: ls_containers ls_volumes ls_networks ls_images

ls_containers: sudo
	@echo $(INFO) "Listing Docker containers"
	@sudo $(DOCKER) container ls --all --format "table \
	{{.ID}}\t{{.Names}}\t{{.Status}}"

ls_volumes: sudo
	@echo $(INFO) "Listing volumes"
	@sudo $(DOCKER) volume ls --format "table {{.Name}}"

ls_networks:sudo
	@echo $(INFO) "Listing networks"
	@sudo $(DOCKER) network ls --format "table {{.ID}}\t{{.Name}}"

ls_images: sudo
	@echo $(INFO) "Listing images"
	@sudo $(DOCKER) image ls --all

################################################################################
# Utils Rules

sudo:
	@echo $(INFO) "Requesting sudo access"
	@sudo echo -n

init:
	@echo $(INFO) "Initializing npm packages"
	@cd $(SOURCE_DIR) && npm init -y

install:
	@echo $(INFO) "Installing npm packages"
	@npm install

set_host:
	@echo $(INFO) "Setting host address"
	@ sudo grep -q corpsolutions /etc/hosts || sudo sed -i "3i127.0.0.1\tcorpsolutions.ada.br" /etc/hosts

################################################################################
