import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard, 
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAvatar
} from '@ionic/react';

const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Welcome to Spotify</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Spotify</IonCardTitle>
            <IonCardSubtitle>"Discover New Sounds Every Day"</IonCardSubtitle>
          </IonCardHeader>

          <IonAvatar style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <img 
              src="https://ritalinboy.com/app/uploads/2022/05/148-1487614_spotify-logo-small-spotify-logo-transparent-hd-png.png" 
              alt="Spotify Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </IonAvatar>

          <IonCardContent>From relaxing tunes to energetic beats, Spotify offers an endless variety of music to match your mood. Explore now and find your perfect playlist.</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
