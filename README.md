# Nawki
It's life, Jim, but not as we know it!

## usage
clone the repo, then run:
```
npm install
npm start
```

## the world
A Nawki world is an environment in which artificial organisms can get together to interact, compete for resources, and explore their environment.

Nawki server's job is simple - to enforce a set of rules on the connected organisms.

## the rules
A Nawki world does nothing by itself. All of its properties are granted by a collection of "rules" which perform fundamental functions like receiving and sending entity states, as well as more interesting things like permitting movement, spawning resources, deciding what "alive" means, and allowing one organism to eat another.  Rules are applied sequentially as they are declared in the rules.json file.
