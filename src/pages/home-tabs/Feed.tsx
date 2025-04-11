import { 
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

import FeedContainer from '../../components/FeedContainer';

const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <img 
            alt="Kuromi character" 
            src="https://cdn.shopify.com/s/files/1/0790/7904/7461/articles/ljhldfn.jpg?v=1715036208" 
          />
          <IonCardHeader>
            <IonCardTitle>Kuromi</IonCardTitle>
            <IonCardSubtitle>The Mischievous but Cute Rebel</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Kuromi is a popular Sanrio character, known for her punk-rock aesthetic and mischievous personality. 
            She is the rival of My Melody, though her rivalry is more playful than serious. Unlike the sweet and gentle My Melody, 
            Kuromi has a more rebellious, tomboyish nature, often described as a "punk" tomboy with a cute side."
            Kuromi is easily recognizable by her black jester’s hat with a pink skull on the front, which changes expressions depending on her mood. 
            She has white fur, a devilish tail, and large, expressive eyes. Despite her tough appearance, she loves romantic stories, writing in her diary, 
            and secretly enjoys cute things—a contrast to her bad-girl persona.
            She is the leader of the Kuromi 5, a gang of mischief-makers, but most of her pranks are lighthearted and comedic rather than truly evil. 
            Although she teases My Melody, deep down, she still has a soft spot for her. Her personality makes her a favorite among fans who love both cute 
            and edgy aesthetics, blending the best of both worlds.
          </IonCardContent>
        </IonCard>

        <FeedContainer />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
