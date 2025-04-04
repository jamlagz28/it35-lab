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
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail
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
            <IonCardSubtitle>Listen to What You Love</IonCardSubtitle>
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

        {/* Additional Card with List Items */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Recommended Tracks</IonCardTitle>
            <IonCardSubtitle>Discover Your New Favorite Songs</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              <IonItem>
                <IonThumbnail slot="start">
                  <img alt="Track 1" src="https://i.scdn.co/image/ab67616d0000b273e7920b4d1e7bd445619f8f2b" />
                </IonThumbnail>
                <IonLabel>NIKI - You'll Be in My Heart</IonLabel>
              </IonItem>

              <IonItem>
                <IonThumbnail slot="start">
                  <img alt="Track 2" src="https://preview.redd.it/multo-cup-of-joe-v0-r2yxfgfv2ene1.png?auto=webp&s=b57a719e078163a489efd160adf1157118cfe331" />
                </IonThumbnail>
                <IonLabel>CUP OF JOE - Multo</IonLabel>
              </IonItem>

              <IonItem>
                <IonThumbnail slot="start">
                  <img alt="Track 3" src="https://i.scdn.co/image/ab67616d0000b2735661646011ef4469dc2c1a1d" />
                </IonThumbnail>
                <IonLabel>MALCOLM TODD - Chest Pain(I Love)</IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonThumbnail slot="start">
                  <img alt="Track 4" src="https://i.scdn.co/image/ab67616d0000b273622ec58b2c7699b6ed4fa0a7" />
                </IonThumbnail>
                <IonLabel>EARL AGUSTIN - Dito Sa'kin</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Feed;
