/* Lecture 4
 *  CS 4388/ CS 5388, Fall 2024, Texas State University
 * Instructor: Isayas Berhe Adhanom <isayas@txstate.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    private ship: gfx.Mesh2;

    private starfield: gfx.Particles2;
    private star: gfx.Mesh2;

    private laserSound: HTMLAudioElement;

    private mousePosition: gfx.Vector2;

    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.ship = gfx.Geometry2Factory.createBox();
        this.star = gfx.Geometry2Factory.createBox();

        this.starfield = new gfx.Particles2(this.star, 200);

        this.laserSound = new Audio('./laser.mp3');

        this.mousePosition = new gfx.Vector2();
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        this.ship.material.texture = new gfx.Texture('./ship.png');
        this.star.material.texture = new gfx.Texture('./star.png');

        for(let i =0 ; i < this.starfield.numParticles; i++){
            this.starfield.particleSizes[i] = Math.random()*0.008+0.002;
            this.starfield.particlePositions[i].set(Math.random()*2-1,Math.random()*2-1);

        }

        this.starfield.update(true, true);

        this.ship.scale.set(0.08,0.08);

        this.scene.add(this.starfield);
        this.scene.add(this.ship);
        
    }

    /**
     * Method called when the mouse is moved. Subclasses can override this method to handle the event.
     * 
     * @param event - The MouseEvent object associated with the mouse movement
     */
    onMouseDown(event: MouseEvent): void {
        this.laserSound.play();
        this.laserSound.currentTime = 0;
    }
    
    /**
     * Method called when the mouse is moved. Subclasses can override this method to handle the event.
     * 
     * @param event - The MouseEvent object associated with the mouse movement
     */
    onMouseMove(event: MouseEvent): void {
        
        this.mousePosition.copy(this.getNormalizedDeviceCoordinates(event.x, event.y));
    }


    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.ship.lookAt(this.mousePosition);

    }
}