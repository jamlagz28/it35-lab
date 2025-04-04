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
    IonAvatar
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

// Reusable Alert Component
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

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

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

    const doRegister = async () => {
        setShowVerificationModal(false);
    
        try {
            // Sign up in Supabase authentication
            const { data, error } = await supabase.auth.signUp({ email, password });
    
            if (error) {
                throw new Error("Account creation failed: " + error.message);
            }
    
            // Hash password before storing in the database
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
    
            // Insert user data into 'users' table
            const { error: insertError } = await supabase.from("users").insert([
                {
                    username,
                    user_email: email,
                    user_firstname: firstName,
                    user_lastname: lastName,
                    user_password: hashedPassword,
                },
            ]);
    
            if (insertError) {
                throw new Error("Failed to save user data: " + insertError.message);
            }
    
            setShowSuccessModal(true);
        } catch (err) {
            // Ensure err is treated as an Error instance
            if (err instanceof Error) {
                setAlertMessage(err.message);
            } else {
                setAlertMessage("An unknown error occurred.");
            }
            setShowAlert(true);
        }
    };
    
    return (
        <IonPage>
            <IonContent className='ion-padding'>
                <IonAvatar style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
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
                }}>SIGN UP FOR SPOTIFY NOW</h3>

                <h1>Create an Account</h1>

                <IonInput label="Username" labelPlacement="stacked" fill="outline" type="text" placeholder="Create a username just for you" style={{ backgroundColor: '#121212', color: '#FFFFFF', borderRadius: '8px', border: '1px solid #1DB954', padding: '10px' }} value={username} onIonChange={e => setUsername(e.detail.value!)} />
                <IonInput label="First Name" labelPlacement="stacked" fill="outline" type="text" placeholder="Given name" style={{ backgroundColor: '#121212', color: '#FFFFFF', borderRadius: '8px', border: '1px solid #1DB954', padding: '10px' }} value={firstName} onIonChange={e => setFirstName(e.detail.value!)} />
                <IonInput label="Last Name" labelPlacement="stacked" fill="outline" type="text" placeholder="Surname" style={{ backgroundColor: '#121212', color: '#FFFFFF', borderRadius: '8px', border: '1px solid #1DB954', padding: '10px' }} value={lastName} onIonChange={e => setLastName(e.detail.value!)} />
                <IonInput label="Email" labelPlacement="stacked" fill="outline" type="email" placeholder="Enter your @nbsc.edu.ph email" style={{ backgroundColor: '#121212', color: '#FFFFFF', borderRadius: '8px', border: '1px solid #1DB954', padding: '10px' }} value={email} onIonChange={e => setEmail(e.detail.value!)} />
                <IonInput label="Password" labelPlacement="stacked" fill="outline" type="password" placeholder="Secure your account with a password" style={{ backgroundColor: '#121212', color: '#FFFFFF', borderRadius: '8px', border: '1px solid #1DB954', padding: '10px' }} value={password} onIonChange={e => setPassword(e.detail.value!)} >
                    <IonInputPasswordToggle slot="end" />
                </IonInput>
                <IonInput label="Confirm Password" labelPlacement="stacked" fill="outline" type="password" placeholder="Re-enter Password" style={{ backgroundColor: '#121212', color: '#FFFFFF', borderRadius: '8px', border: '1px solid #1DB954', padding: '10px' }} value={confirmPassword} onIonChange={e => setConfirmPassword(e.detail.value!)} >
                    <IonInputPasswordToggle slot="end" />
                </IonInput>

                <IonButton onClick={handleOpenVerificationModal} expand="full" shape='round'  color="success" style={{ marginTop: '15px' }}>
                    Register
                </IonButton>
                <IonButton routerLink="/it35-lab" expand="full" fill="clear" color="dark" shape='round'>
                Already registered? Sign in here
                </IonButton>

                {/* Reusable AlertBox Component */}
                <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

            </IonContent>
        </IonPage>
    );
};

export default Register;
