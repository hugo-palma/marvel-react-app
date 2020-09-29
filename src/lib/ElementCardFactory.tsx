import ComicCard from 'src/components/layouts/Comics/components/ComicCard'
import StoryCard from 'src/components/layouts/Stories/components/StoryCard'
import CharacterCard from 'src/components/layouts/Characters/components/CharacterCard'
export default class ElementCardFactory{
    public getElementCard(element: string) {
        if(!element)
        {
            return
        }
        if(element === '/comics'){
            return ComicCard
        }
        else if(element === '/stories'){
            return StoryCard
        }
        else if(element === '/characters'){
            return CharacterCard
        }
        else{
            return undefined
        }
    }

}