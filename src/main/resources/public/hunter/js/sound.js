class Sound
{
    constructor()
    {
        this.pistolSound = new Howl({
            src: ['sound/pistol.mp3']
        })
    }

    pistol()
    {
        this.pistolSound.play()
    }
}