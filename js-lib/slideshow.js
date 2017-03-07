/*
The MIT License (MIT)

Copyright (c) Tue Mar 07 2017 BlitzDaWolf

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



parrent the parrent for the photos
slideNames String array of the photos names
speed the slideshow speed Default(0.1)
dir direction of the slideshow (0: right to left) (1: bottom top)
className the classname for the slide default("slide")
autoplay play the slideshow on create default(false)
touchControll W.I.P default(false)

create: create the slideshow
move: move the slideshow to the direction
pause: pause the slideshow
play: resume the slideshow
destroy: destroy the slideshow
copy: Show the copyright in the console
*/

function SlideShow(parrent, slideNames = [], speed = .1, dir = 0, className = "slide", autoPlay = false, touchControll = false) {

    this.slides = [];
    this.parrent = parrent;
    this.speed = speed;
    this.dir = dir;
    this.slideN = slideNames;
    this.current = 0;
    this.touch = touchControll;

    this.inter;
    this.posX = 0;
    this.posY = 0;

    this.lastX = 0;
    this.lastY = 0;
    this.autoPlay = autoPlay;
    this.slideClass = className;

    // Start creating slideshow
    this.create = function () {
        this.destroy();

        var width = 0;
        var height = 0;
        if (this.touch) {
            var t = document.createElement("img");
            t.src = this.slideN[this.slideN.length - 1];
            t.draggable = false;

            t.classList.add(this.slideClass);
            this.parrent.appendChild(t);
            this.slides = document.querySelectorAll("#" + this.parrent.id + " *");
            width += this.slides[0].width;
            height += this.slides[0].height;
            this.posX = -(width - (this.speed * 2));
            this.posY = -(height - (this.speed * 2));
        }
        for (var i = 0; i < this.slideN.length; i++) {
            var t = document.createElement("img");
            t.src = this.slideN[i];
            t.classList.add(this.slideClass);
            t.draggable = false;

            this.parrent.appendChild(t);
            width += t.width;
            height += t.height;
        }
        if (this.dir == 0) {
            this.slides = this.parrent.childNodes;
            this.parrent.style.width = width + "px";
            this.parrent.style.height = "256px";
        } else if (this.dir == 1) {
            this.slides = this.parrent.childNodes;
            this.parrent.style.height = height + "px";
            this.parrent.style.width = "100px";
        }
        this.slides = document.querySelectorAll("#" + this.parrent.id + " *");
        this.move();
        if (this.autoPlay)
            this.play();
    }

    // Move the slide show
    this.move = function () {
        if (this.touch) {
            var deadZoneX = this.slides[0].width + this.slides[1].width;
            var deadZoneY = this.slides[0].height + this.slides[1].height;
        } else {
            var deadZoneX = this.slides[0].width;
            var deadZoneY = this.slides[0].height;
        }
        //        alert(deadZoneX);
        // if the slideshow needs to move from right to left
        if (this.dir == 0) {
            this.posX -= this.speed;
            // if the current X position <= the photo width(reset)
            if (this.posX <= -deadZoneX) {
                this.nextW();
            }
            this.parrent.style.transform = "translateX(" + this.posX + "px)";
        }
        // if the slideshow needs to move from bottom to top
        else if (this.dir == 1) {
            this.posY -= this.speed;
            if (this.posY <= -this.slides[0].height) {
                this.nextH();
            }
            this.parrent.style.transform = "translateY(" + this.posY + "px)";
        }

    }

    // Pause the slideshow
    this.pause = function () {
        clearInterval(this.inter);
    }

    // Play the slideshow
    this.play = function () {
        this.inter = setInterval(function (e) {
            e.move();
        }, 10, this)
    }

    // Destroy the evidence
    this.destroy = function () {
        console.log("Starting the fire");

        for (var i = 0; i < this.slides.length; i++) {
            this.parrent.removeChild(this.slides[i]);
        }
        //        this.parrent.parentNode.removeChild(this.par);

        this.parrent.style = "";
        clearInterval(this.inter);
        console.log("The fire has been spread");
    }

    this.copy = function () {
        return 'The MIT License (MIT)\nCopyright (c) Tue Mar 07 2017 BlitzDaWolf\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the "Software"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORTOR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.';
    }

    // DEBUG STUF
    this.nextW = function () {
            this.posX = this.posX + this.slides[0].width;
            if (this.current >= this.slideN.length)
                this.current = 0;
            this.parrent.removeChild(this.slides[0]);

            var t = document.createElement("img");
            t.src = this.slideN[this.current];
            t.classList.add(this.slideClass);

            t.draggable = false;
            this.parrent.appendChild(t);
            this.slides = document.querySelectorAll("#" + this.parrent.id + " *");

            this.current++;
        }
        // DEBUG STUF
    this.nextH = function () {
        this.posY = this.posY + this.slides[0].height;
        if (this.current >= this.slideN.length)
            this.current = 0;
        this.parrent.removeChild(this.slides[0]);

        var t = document.createElement("img");
        t.src = this.slideN[this.current];
        t.classList.add(this.slideClass);

        t.draggable = false;
        this.parrent.appendChild(t);
        this.slides = document.querySelectorAll("#" + this.parrent.id + " *");

        this.current++;
    }
}