import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAlert,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const NotificationBanner: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Heads up!"
      message={message}
      buttons={['Got it!']}
    />
  );
};

const SignUpPortal: React.FC = () => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const handleVerificationOpen = () => {
    if (!email.endsWith("@nbsc.edu.ph")) {
      setAlertText("Registration is restricted to @nbsc.edu.ph emails only.");
      setAlertVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setAlertText("Oops! Your passwords don’t match.");
      setAlertVisible(true);
      return;
    }

    setShowVerifyModal(true);
  };

  const performRegistration = async () => {
    setShowVerifyModal(false);

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error("Signup failed: " + error.message);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const { error: dbError } = await supabase.from("users").insert([{
        username,
        user_email: email,
        user_firstname: firstName,
        user_lastname: lastName,
        user_password: hashedPassword,
      }]);

      if (dbError) throw new Error("Failed to save to database: " + dbError.message);

      setShowCongratsModal(true);
    } catch (err) {
      setAlertText(err instanceof Error ? err.message : "Unexpected error occurred.");
      setAlertVisible(true);
    }
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{
          backgroundColor: '#f1f1f1', // Light YouTube background
          color: '#333333', // Dark text color
          fontFamily: "'Roboto', sans-serif", // YouTube's primary font
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
        }}>
          {/* YouTube Music Icon */}
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
            Get Started – Create Profile
          </h2>

          <IonInput
            label="User Handle"
            labelPlacement="floating"
            fill="outline"
            type="text"
            placeholder="Pick a unique handle"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            style={{
              marginTop: '15px',
              width: '100%',
              maxWidth: '400px',
            }}
          />

          <IonInput
            label="Given Name"
            labelPlacement="floating"
            fill="outline"
            type="text"
            placeholder="Your first name"
            value={firstName}
            onIonChange={(e) => setFirstName(e.detail.value!)}
            style={{
              marginTop: '15px',
              width: '100%',
              maxWidth: '400px',
            }}
          />

          <IonInput
            label="Family Name"
            labelPlacement="floating"
            fill="outline"
            type="text"
            placeholder="Your last name"
            value={lastName}
            onIonChange={(e) => setLastName(e.detail.value!)}
            style={{
              marginTop: '15px',
              width: '100%',
              maxWidth: '400px',
            }}
          />

          <IonInput
            label="Institutional Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="you@nbsc.edu.ph"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            style={{
              marginTop: '15px',
              width: '100%',
              maxWidth: '400px',
            }}
          />

          <IonInput
            label="Set Password"
            labelPlacement="floating"
            fill="outline"
            type="password"
            placeholder="Choose a secure password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            style={{
              marginTop: '15px',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonInput
            label="Repeat Password"
            labelPlacement="floating"
            fill="outline"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            style={{
              marginTop: '15px',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonButton
            onClick={handleVerificationOpen}
            expand="full"
            shape="round"
            color="danger" // YouTube Red
            style={{
              marginTop: '20px',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            Complete Sign Up
          </IonButton>

          <IonButton
            routerLink="/it35-lab"
            expand="full"
            fill="clear"
            shape="round"
            style={{
              width: '100%',
              maxWidth: '400px',
              color: '#666666',
              textDecoration: 'underline',
            }}
          >
            Already registered? Log in instead
          </IonButton>
        </div>

        {/* Confirmation Modal */}
        <IonModal isOpen={showVerifyModal} onDidDismiss={() => setShowVerifyModal(false)}>
          <IonContent className="ion-padding">
            <IonCard style={{ marginTop: '25%' }}>
              <IonCardHeader>
                <IonCardTitle>Review Your Info</IonCardTitle>
                <IonCardSubtitle>Before we proceed, take a final look:</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <strong>Handle:</strong> {username}<br />
                <strong>Email:</strong> {email}<br />
                <strong>Name:</strong> {firstName} {lastName}
              </IonCardContent>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <IonButton fill="clear" onClick={() => setShowVerifyModal(false)}>Cancel</IonButton>
                <IonButton color="primary" onClick={performRegistration}>Proceed</IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal isOpen={showCongratsModal} onDidDismiss={() => setShowCongratsModal(false)}>
          <IonContent className="ion-padding" style={{ textAlign: 'center', marginTop: '30%' }}>
            <IonTitle>You're All Set! 🎉</IonTitle>
            <IonText>
              <p>Your profile has been successfully created.</p>
              <p>Make sure to verify your email address.</p>
            </IonText>
            <IonButton routerLink="/it35-lab" color="primary">
              Go to Login Page
            </IonButton>
          </IonContent>
        </IonModal>

        {/* Notification Component */}
        <NotificationBanner message={alertText} isOpen={alertVisible} onClose={() => setAlertVisible(false)} />
      </IonContent>
    </IonPage>
  );
};

export default SignUpPortal;
