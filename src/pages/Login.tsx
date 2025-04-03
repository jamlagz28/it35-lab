import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonIcon, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true); 
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };
  
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div style={{
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'25%'
        }}>
          <IonAvatar
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '150px',
              height: '150px',
              borderRadius: '50%', 
              overflow: 'hidden' 
            }}
          >
            <img 
              src="https://ritalinboy.com/app/uploads/2022/05/148-1487614_spotify-logo-small-spotify-logo-transparent-hd-png.png" 
              alt="Spotify Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </IonAvatar>
          <h3 style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1DB954',
            marginTop: '10px'
          }}>LOGIN TO SPOTIFY</h3>
          <IonInput label="Email" labelPlacement="floating" fill="outline" type="email" placeholder="Enter Email" style={{ backgroundColor: '#121212', color: '#FFFFFF', borderRadius: '8px', border: '1px solid #1DB954', padding: '10px' }}
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
          <IonInput style={{ marginTop: '10px', backgroundColor: '#121212', color: '#FFFFFF', borderRadius: '8px', border: '1px solid #1DB954', padding: '10px' }}      
            fill="outline"
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
        </div>
        <IonButton onClick={doLogin} expand="full" shape='round' className="spotify-button" color="success">
          Log Into Your Account
        </IonButton>

        <IonButton routerLink="/it35-lab/Register" expand="full" fill="clear" shape='round'>
          Don't have an account? Register here
        </IonButton>

        {/* Reusable AlertBox Component */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        {/* IonToast for success message */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login complete! Preparing your dashboard"
          duration={1500}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;