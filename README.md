all-the-workshops
=================

All the NodeSchool workshops

## What is this for?

You know when you are doing events and stuff and the wifi is just terrible. This is what this is for.

This allows you to throw up the `*.tgz` NodeSchool workshoppers on the local network, or on a USB stick to pass around.

## Use

`$ mkdir workshops; cd workshops; npm i all-the-workshops`

Wait a bit and it will do some magic. Then in your `node_modules/all-the-workshops/workshops` dir you should have all the `*.tgz` files for every workshopper.

Then you can just:

`$ npm i -g stream-adventure.tgz`

and it will install with all the dependencies bundled.
