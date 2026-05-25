import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TraiterDevoirScreen() {
  const router = useRouter();
  const [reponse, setReponse] = useState('');
  
  // Système de chrono pour se mettre en condition d'interro
  const [secondes, setSecondes] = useState(0);
  const [chronoActif, setChronoActif] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (chronoActif) {
      interval = setInterval(() => {
        setSecondes((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [chronoActif]);

  // Formater le temps en MM:SS
  const formatTemps = () => {
    const minutes = Math.floor(secondes / 60);
    const secs = secondes % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const soumettreCopie = () => {
    setChronoActif(false);
    Alert.alert(
      "🎉 Copie enregistrée !",
      `Bravo ! Tu as traité ce sujet en ${formatTemps()}. Ton brouillon est sauvegardé localement sur ton espace KRAK.`,
      [{ text: "Super", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En-tête */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>‹ Abandonner</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Espace d'Entraînement</Text>
        <View style={styles.chronoBox}>
          <Text style={styles.chronoText}>⏱️ {formatTemps()}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Simulation du sujet de devoir partagé */}
        <Text style={styles.sectionTitle}>Sujet du Devoir sélectionné :</Text>
        <View style={styles.sujetCard}>
          <Text style={styles.sujetHeader}>LYCÉE SCIENTIFIQUE DE YAMOUSSOUKRO</Text>
          <Text style={styles.sujetSub}>Évaluation Commune • Niveau : Seconde C</Text>
          <View style={styles.divider} />
          <Text style={styles.sujetExercice}>
            <Text style={{ fontWeight: 'bold', color: '#00875f' }}>Exercice 1 : </Text>
            Soit un vecteur $\vec{u}$ de coordonnées $(3; -5)$ et un point $R(3; -5)$. 
            Montrer que les points alignés dépendent de la colinéarité des vecteurs de base. Calculer la norme.
          </Text>
          <Text style={styles.sujetExercice}>
            <Text style={{ fontWeight: 'bold', color: '#00875f' }}>Exercice 2 : </Text>
            Calculer l'intensité du courant traversant un conducteur ohmique de résistance $R = 10\ \Omega$ soumis à une tension de $U = 5\text{ V}$ (Appliquer la loi d'Ohm).
          </Text>
          <View style={styles.imagePlaceholder}>
            <Text style={{ fontSize: 30 }}>📸</Text>
            <Text style={{ color: '#8d8d99', fontSize: 12, marginTop: 4 }}>Aperçu du scan original joint par l'élève</Text>
          </View>
        </View>

        {/* Zone de saisie des réponses */}
        <Text style={styles.sectionTitle}>Ton bloc-notes / Zone de réponse :</Text>
        <TextInput
          style={styles.inputReponse}
          multiline
          placeholder="Rédige tes calculs, formules ou ton raisonnement ici pour t'entraîner..."
          placeholderTextColor="#666"
          value={reponse}
          onChangeText={setReponse}
        />

        {/* Bouton de validation */}
        <TouchableOpacity style={styles.submitButton} onPress={soumettreCopie}>
          <Text style={styles.submitButtonText}>✅ Terminer et enregistrer ma copie</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214' },
  topBar: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#29292e' },
  backButton: { backgroundColor: '#202024', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  backText: { color: '#ef4444', fontSize: 14, fontWeight: '600' },
  topBarTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', flex: 1, marginLeft: 12 },
  chronoBox: { backgroundColor: '#1a1a1e', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#ff9800' },
  chronoText: { color: '#ff9800', fontWeight: 'bold', fontFamily: 'monospace' },
  scrollContainer: { padding: 16 },
  sectionTitle: { color: '#a8a8b3', fontSize: 14, fontWeight: 'bold', marginBottom: 10, marginTop: 10, textTransform: 'uppercase' },
  sujetCard: { backgroundColor: '#202024', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#29292e', marginBottom: 20 },
  sujetHeader: { color: '#fff', fontWeight: 'bold', fontSize: 15, textAlign: 'center' },
  sujetSub: { color: '#8d8d99', fontSize: 12, textAlign: 'center', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#29292e', marginVertical: 12 },
  sujetExercice: { color: '#e1e1e6', fontSize: 14, lineHeight: 22, marginBottom: 14 },
  imagePlaceholder: { backgroundColor: '#121214', height: 120, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderStyle: 'dashed', borderColor: '#323238', marginTop: 10 },
  inputReponse: { backgroundColor: '#202024', color: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#29292e', minHeight: 180, textAlignVertical: 'top', fontSize: 15, lineHeight: 22 },
  submitButton: { backgroundColor: '#00875f', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 20, marginBottom: 40 },
  submitButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 }
});
