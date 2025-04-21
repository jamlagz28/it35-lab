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
            alt="Spotify" 
            src="https://upload.wikimedia.org/wikipedia/commons/5/56/Spotify_logo_horizontal_black.jpg" 
          />
          <IonCardHeader>
            <IonCardTitle>Kuromi</IonCardTitle>
            <IonCardSubtitle>The Mischievous but Cute Rebel</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <FeedContainer />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
