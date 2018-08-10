# Copad - Collaborative Coding Environment 
> Copad aims to provide you with an easy way to collaboratively work on code and execute it right in your browser. The most popular use cases are tech interviews and teaching. 

![Copad](https://scontent-frt3-2.xx.fbcdn.net/v/t1.15752-9/38887162_1916664251966763_3642131442374279168_n.png?_nc_cat=0&oh=29ce05a5393a3bb1a93a9cab33232126&oe=5BCC35AB)

With Copad, you can easily launch a local webpage for internal use between you and your coworkers/interviewee/students. The application has a built in editor with syntax highlight and indentation (CodeMirror) and executes code in your browser through an iframe (Brython is used for Python code).



## Installation
You can either install Docker (recommended) or install all the dependencies (MeteorJS + all the needed packages)

## Docker
If you already have Docker installed, simply execute 

`docker pull mshvern/copad`

`docker run -d -p 80:3000 mshvern/copad` 

And that's it! When the docker finishes downloading and launching Copad, you will be able to access your Copad at `localhost`. 
If you don't have a public IP Address, I recommend using **ngrok** to acquire one. It's completely free, works like a charm, easy to set up, and an awesome piece of software in general. 

## Manual Setup
For a manual setup to work, you need to have Meteor downloaded and added to your PATH. After that, clone the repo and navigate into its root and run `meteor npm install` and `meteor`, after that you'll be able to access Copad at `localhost:3000`

## Release History

* 0.3.1
    * Cleaned up and published at Docker Hub
* 0.3.0
    * ADD: Python syntax highlighting and executing code through an iFrame (with Brython) added. 
* 0.2.0
    * ADD: Executing Javascript through an iFrame
* 0.1.0
    * ADD: Javascript syntax highlighting and `monokai` editor theme added
* 0.0.1
    * General functionality, not executing any code yet
