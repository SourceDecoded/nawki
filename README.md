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
A Nawki world does nothing by itself. All of its properties and behaviors are defined by a collection of "rules" which do interesting things like permitting movement, spawning resources, deciding what "alive" means, and allowing one organism to eat another.  Rules are applied sequentially as they are declared in the rules.json file.

Two special rules will likely be part of any world, and are probably the last rules applied:
 * CleanRequests empties out each entity's request properties, otherwise the requests would be processed on the next tick.
 * TransmitState tells the entities to communicate their current state back to their connected brains.
