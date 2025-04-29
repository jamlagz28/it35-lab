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
      <IonContent fullscreen>
        <div
          style={{
            backgroundImage: 'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b434546-d2d2-4907-92ff-af5ac256c1fe/dhgz2fh-16f356b0-6789-4567-816f-777ed4df066a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzViNDM0NTQ2LWQyZDItNDkwNy05MmZmLWFmNWFjMjU2YzFmZVwvZGhnejJmaC0xNmYzNTZiMC02Nzg5LTQ1NjctODE2Zi03NzdlZDRkZjA2NmEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BUB3YJio3SS9HcO798ByqVJnKRFHg-1yfJK3uwqlkYU")',
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
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            padding: '30px',
            width: '100%',
            maxWidth: '420px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            {/* YouTube Music Icon */}
            <img
              src="https://media.tenor.com/8cViuZ78BC4AAAAj/play-youtube.gif"
              alt="YouTube Music Logo"
              style={{
                width: '140px',
                height: '140px',
                margin: '0 auto 20px',
                display: 'block'
              }}
            />

            <h2 style={{
              color: '#F5ECD5',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '30px',
              textAlign: 'center',
            }}>
              Get Started – Create Profile
            </h2>

            {/* Inputs */}
            <IonInput
              label="User Handle"
              labelPlacement="floating"
              fill="outline"
              type="text"
              placeholder="Pick a unique handle"
              value={username}
              onIonInput={(e) => setUsername(e.detail.value!)}
              style={{ marginBottom: '15px' }}
            />
            <IonInput
              label="Given Name"
              labelPlacement="floating"
              fill="outline"
              type="text"
              placeholder="Your first name"
              value={firstName}
              onIonInput={(e) => setFirstName(e.detail.value!)}
              style={{ marginBottom: '15px' }}
            />
            <IonInput
              label="Family Name"
              labelPlacement="floating"
              fill="outline"
              type="text"
              placeholder="Your last name"
              value={lastName}
              onIonInput={(e) => setLastName(e.detail.value!)}
              style={{ marginBottom: '15px' }}
            />
            <IonInput
              label="Institutional Email"
              labelPlacement="floating"
              fill="outline"
              type="email"
              placeholder="you@nbsc.edu.ph"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value!)}
              style={{ marginBottom: '15px' }}
            />
            <IonInput
              label="Set Password"
              labelPlacement="floating"
              fill="outline"
              type="password"
              placeholder="Choose a secure password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
              style={{ marginBottom: '15px' }}
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
              onIonInput={(e) => setConfirmPassword(e.detail.value!)}
              style={{ marginBottom: '20px' }}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            {/* Buttons */}
            <IonButton
              expand="block"
              style={{
                backgroundColor: '#C5172E',
                color: '#ffffff',
                fontWeight: 'bold',
                borderRadius: '10px',
                marginBottom: '10px',
              }}
              onClick={handleVerificationOpen}
            >
              Complete Sign Up
            </IonButton>

            <IonButton
              routerLink="/it35-lab"
              expand="block"
              fill="clear"
              style={{
                color: '#ffffff',
                textDecoration: 'underline',
                fontSize: '14px',
              }}
            >
              Already registered? Log in instead
            </IonButton>
          </div>
        </div>

        {/* Verification Modal */}
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

        {/* Notification Banner */}
        <NotificationBanner message={alertText} isOpen={alertVisible} onClose={() => setAlertVisible(false)} />
      </IonContent>
    </IonPage>
  );
};

export default SignUpPortal;
