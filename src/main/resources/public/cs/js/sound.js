class Sound
{
    constructor()
    {
        this.pistolSound = new Howl({
            src: ['sounds/pistol.mp3'],
            volume: 0.1
        })
    }

    pistol()
    {
        this.pistolSound.play()
    }
}