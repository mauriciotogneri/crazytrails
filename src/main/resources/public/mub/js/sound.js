class Sound
{
    constructor()
    {
        this.pistolSound = new Howl({
            src: ['sound/pistol.mp3'],
            volume: 0.1
        })
    }

    pistol()
    {
        this.pistolSound.play()
    }
}