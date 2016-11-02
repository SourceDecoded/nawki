# Nawki
It's life, Jim, but not as we know it!

## usage
clone the repo, then run:
```
npm install
node server
```

## the world
A Nawki world is an environment in which artificial organisms can get together to interact, compete for resources, and explore their environment.

Nawki server's job is simple - to enforce a set of rules on the connected organisms.

## the rules
A Nawki world does nothing by itself. All of its properties and behaviors are defined by a collection of "rules" which do interesting things like permitting movement, spawning resources, deciding what "alive" means, and allowing one organism to eat another.  Rules are applied sequentially as they are declared in the rules.json file.

TransmitState is a special rule, likely applied last, which transmits certain properties back to the connected "brains".

## the sample entity
Start Nawki, open a new terminal, navigate to sample-lifeform in the repo. Start the sample:
```
node index.js
```
When you see "Connected", it's talking to Nawki. Type "spawn" to spawn in the world. Then type "state" to see your organism's current state.
Try typing:
```
move -10 10
```
To give your organism a "push" up and to the right. Type "state" repeatedly to see the gravity and friction rules at work.
