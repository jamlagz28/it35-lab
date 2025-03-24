import React, { useState } from 'react';
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonText,
  IonAlert,
  IonModal,
  IonToast,
  useIonRouter
} from '@ionic/react';

const Auth: React.FC = () => {
  const navigation = useIonRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Handle the logic for opening verification modal after checks
  const handleOpenVerificationModal = () => {
    if (!email.endsWith("@nbsc.edu.ph")) {
      setAlertMessage("Only @nbsc.edu.ph emails are allowed to register.");
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      setShowAlert(true);
      return;
    }

    setShowVerificationModal(true);
  };

  const doLogin = () => {
    if (!username || !password) {
      setShowAlert(true);
    } else {
      setShowSuccessModal(true);
      setShowToast(true);
    }
  };

  const doRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      setShowAlert(true);
    } else {
      // Call the new function to validate and handle verification modal
      handleOpenVerificationModal();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '22px' }}>{isRegister ? "Register" : "Login"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <IonAvatar style={{ width: '100px', height: '100px', marginBottom: '20px' }}>
            <img alt="User Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRWVkXV1nRBH6hUiuHMuGywaBgZF7PxmtJuw&s" />
          </IonAvatar>
          <h2 style={{ fontFamily: 'Verdana, sans-serif', fontSize: '20px', fontWeight: 'bold' }}>{isRegister ? "Create an Account" : "User Login"}</h2>
        </div>

        <IonGrid>
          <IonRow>
            <IonCol size="12">
              {!isRegister ? (
                <>
                  <IonItem>
                    <IonLabel position="floating" style={{ fontFamily: 'Verdana, sans-serif' }}>Username</IonLabel>
                    <IonInput type="text" value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating" style={{ fontFamily: 'Verdana, sans-serif' }}>Password</IonLabel>
                    <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
                    <IonInputPasswordToggle slot="end" />
                  </IonItem>

                  <IonButton onClick={doLogin} expand="full">Login</IonButton>
                  <p style={{ textAlign: "center", marginTop: "10px", fontFamily: 'Verdana, sans-serif' }}>
                    Don't have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setIsRegister(true)}>Register here</span>
                  </p>
                </>
              ) : (
                <>
                  <IonItem>
                    <IonLabel position="floating" style={{ fontFamily: 'Verdana, sans-serif' }}>Full Name</IonLabel>
                    <IonInput type="text" value={username} onIonChange={(e) => setUsername(e.detail.value!)} />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating" style={{ fontFamily: 'Verdana, sans-serif' }}>Email</IonLabel>
                    <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating" style={{ fontFamily: 'Verdana, sans-serif' }}>Password</IonLabel>
                    <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
                    <IonInputPasswordToggle slot="end" />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="floating" style={{ fontFamily: 'Verdana, sans-serif' }}>Confirm Password</IonLabel>
                    <IonInput type="password" value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value!)} />
                    <IonInputPasswordToggle slot="end" />
                  </IonItem>

                  <IonButton onClick={doRegister} expand="full" color="success">Register</IonButton>
                  <p style={{ textAlign: "center", marginTop: "10px", fontFamily: 'Verdana, sans-serif' }}>
                    Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setIsRegister(false)}>Login here</span>
                  </p>
                </>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} header="Error" message={alertMessage} buttons={['OK']} />

      <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
        <IonContent className="ion-padding">
          <h2 style={{ fontFamily: 'Verdana, sans-serif', fontSize: '20px', fontWeight: 'bold' }}>{isRegister ? "Registration Successful!" : "Login Successful!"}</h2>
          <IonButton expand="full" onClick={() => { setShowSuccessModal(false); navigation.push('/it35-lab/app', 'forward', 'replace'); }}>Go to Dashboard</IonButton>
        </IonContent>
      </IonModal>

      <IonToast isOpen={showToast} message="Login successful! Redirecting..." duration={3000} onDidDismiss={() => setShowToast(false)} />

      {/* Add Verification Modal here */}
      <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
        <IonContent className="ion-padding">
          <h2 style={{ fontFamily: 'Verdana, sans-serif', fontSize: '20px', fontWeight: 'bold' }}>Please verify your email address</h2>
          {/* Add your email verification logic here */}
          <IonButton expand="full" onClick={() => { setShowVerificationModal(false); setShowSuccessModal(true); }}>Verify</IonButton>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Auth;
