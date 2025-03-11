import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';
import { logoFacebook, logoIonic } from 'ionicons/icons';

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            marginTop: '-10rem',
            marginBottom: '-18rem',
          }}
        >
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            <img
              alt="Silhouette of a person's head"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRWVkXV1nRBH6hUiuHMuGywaBgZF7PxmtJuw&s"
            />
          </IonAvatar>
          <h5
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Users Login
          </h5>
        </div>

        <IonGrid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IonRow>
            <IonCol size="8">
              <IonItem>
                <IonInput label="Email" type="email" placeholder="youremail@gmail.com"></IonInput>
              </IonItem>

              <IonItem>
                <IonInput type="password" label="Password">
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
              </IonItem>

              <IonButton onClick={doLogin} expand="full">
                Login
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;