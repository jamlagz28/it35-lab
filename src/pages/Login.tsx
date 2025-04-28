import {
  IonAlert,
  IonButton,
  IonContent,
  IonPage,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

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
      <IonContent fullscreen>
        <div
          style={{
            backgroundImage: 'url("https://i.pinimg.com/originals/79/7b/96/797b96e0880a4fe147f1eaa89d7c7013.gif")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white
            borderRadius: '15px',
            padding: '30px',
            width: '100%',
            maxWidth: '420px',
            backdropFilter: 'blur(8px)', // Frosted glass effect
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Youtube_Music_icon.svg/1024px-Youtube_Music_icon.svg.png"
              alt="YouTube Music Logo"
              style={{
                width: '140px',
                height: '140px',
                margin: '0 auto 20px',
                display: 'block'
              }}
            />

            <h2 style={{
              color: '#FF0000',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '30px',
              textAlign: 'center',
            }}>
              Log in to Your YouTube Portal
            </h2>

            {/* Email Input */}
            <div style={{ position: 'relative', marginBottom: '15px' }}>
              <input
                type="email"
                placeholder=" "
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                onFocus={(e) => e.target.style.boxShadow = '0 0 8px 2pxrgb(255, 255, 255)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  border: '1px solid #FF0000',
                  color: '#333333',
                  borderRadius: '8px',
                  padding: '12px 10px',
                  fontSize: '16px',
                  transition: 'box-shadow 0.3s ease',
                }}
              />
              {userEmail.length === 0 && (
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
              )}
            </div>

            {/* Password Input */}
            <div style={{ position: 'relative', marginBottom: '25px' }}>
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
                  padding: '12px 10px',
                  fontSize: '16px',
                  transition: 'box-shadow 0.3s ease',
                }}
              />
              {userPassword.length === 0 && (
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
              )}
            </div>

            {/* Login Button */}
            <IonButton
              expand="block"
              style={{
                backgroundColor: '#FF0000',
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

            {/* Register Link */}
            <IonButton
              routerLink="/it35-lab/Register"
              expand="block"
              fill="clear"
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                fontSize: '14px',
                transition: 'color 0.3s ease',
              }}
              onIonFocus={(e) => e.target.style.color = '#FF0000'}
              onIonBlur={(e) => e.target.style.color = '#ffffff'}
            >
              Need an account? Register here
            </IonButton>
          </div>
        </div>

        <NotificationBox message={notice} isOpen={showNotice} onClose={() => setShowNotice(false)} />

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
