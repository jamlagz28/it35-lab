import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { personCircleOutline } from 'ionicons/icons';

const NotificationBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Heads up!"
      message={message}
      buttons={['Close']}
    />
  );
};

const AccessPortal: React.FC = () => {
  const router = useIonRouter();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [showNotice, setShowNotice] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPassword,
    });

    if (error) {
      setNotice(error.message);
      setShowNotice(true);
      return;
    }

    setToastVisible(true);
    setTimeout(() => {
      router.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{
        backgroundColor: '#f1f1f1', // Light YouTube background
        color: '#333333', // Dark text color
        fontFamily: "'Roboto', sans-serif" // YouTube's primary font
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}>
          {/* YouTube Music Icon as Avatar */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Youtube_Music_icon.svg/1024px-Youtube_Music_icon.svg.png"
            alt="YouTube Music Logo"
            style={{
              width: '140px',
              height: '140px',
              marginBottom: '20px',
            }}
          />

          <h2 style={{
            color: '#FF0000', // YouTube Red
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center',
          }}>
            Log in to Your YouTube-like Portal
          </h2>

          {/* Email Input with custom label and animation */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', marginBottom: '15px' }}>
            <input
              type="email"
              placeholder=" "
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              onFocus={(e) => e.target.style.boxShadow = '0 0 8px 2px #FF0000'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid #FF0000',
                color: '#333333',
                borderRadius: '8px',
                padding: '12px 10px 12px 10px',
                fontSize: '16px',
                transition: 'box-shadow 0.3s ease',
              }}
            />
            <label style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              color: '#FF0000',
              fontSize: '16px',
              pointerEvents: 'none',
              transform: 'translateY(-50%)',
              transition: '0.2s ease all',
            }}>
              Email
            </label>
          </div>

          {/* Password Input with custom label and animation */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px', marginBottom: '25px' }}>
            <input
              type="password"
              placeholder=" "
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              onFocus={(e) => e.target.style.boxShadow = '0 0 8px 2px #FF0000'}
              onBlur={(e) => e.target.style.boxShadow = 'none'}
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid #FF0000',
                color: '#333333',
                borderRadius: '8px',
                padding: '12px 10px 12px 10px',
                fontSize: '16px',
                transition: 'box-shadow 0.3s ease',
              }}
            />
            <label style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              color: '#FF0000',
              fontSize: '16px',
              pointerEvents: 'none',
              transform: 'translateY(-50%)',
              transition: '0.2s ease all',
            }}>
              Password
            </label>
          </div>

          {/* Login Button with hover effect */}
          <IonButton
            expand="block"
            style={{
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#FF0000', // YouTube Red
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '10px',
              marginBottom: '10px',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onClick={handleLogin}
            onIonFocus={(e) => e.target.style.boxShadow = '0 0 12px 4px #FF0000'}
            onIonBlur={(e) => e.target.style.boxShadow = 'none'}
          >
            Log In
          </IonButton>

          {/* Register Button with hover effect */}
          <IonButton
            routerLink="/it35-lab/Register"
            expand="block"
            fill="clear"
            style={{
              color: '#666666',
              textDecoration: 'underline',
              fontSize: '14px',
              transition: 'color 0.3s ease',
            }}
            onIonFocus={(e) => e.target.style.color = '#FF0000'}
            onIonBlur={(e) => e.target.style.color = '#666666'}
          >
            Need an account? Register here
          </IonButton>
        </div>

        {/* Notification alert */}
        <NotificationBox message={notice} isOpen={showNotice} onClose={() => setShowNotice(false)} />

        {/* Toast message */}
        <IonToast
          isOpen={toastVisible}
          onDidDismiss={() => setToastVisible(false)}
          message="Welcome! Redirecting to your dashboard..."
          duration={1500}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default AccessPortal;
