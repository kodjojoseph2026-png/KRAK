import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  TouchableOpacity, TextInput, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DevoirsScreen() {
  const router = useRouter();
  const [reponse, setReponse] = useState('');
  const [secondes, setSecondes] = useState(0);
  const [chronoActif, setChronoActif] = useState(false); // démarre sur pause
  const [devoirActif, setDevoirActif] = useState<number | null>(null);

  const DEVOIRS = [
    {
      id: 1,
      matiere: 'Mathématiques',
      niveau: 'Seconde C',
      etablissement: 'Lycée Scientifique de Yamoussoukro',
      exercices: [
        'Soit un vecteur u⃗ de coordonnées (3;−5). Montrer que les points sont alignés en utilisant la colinéarité. Calculer la norme.',
        'Résoudre le système : 2x + 3y = 7 et x − y = 1.'
      ],
    },
    {
      id: 2,
      matiere: 'Physique - Chimie',
      niveau: 'Seconde C',
      etablissement: 'Lycée Classique d\'Abidjan',
      exercices: [
        'Un conducteur ohmique de résistance R = 10 Ω est soumis à U = 5 V. Calculer l\'intensité du courant (loi d\'Ohm).',
        'Donner la définition de la tension électrique et ses unités.',
      ],
    },
    {
      id: 3,
      matiere: 'SVT',
      niveau: 'Terminale D',
      etablissement: 'Lycée Mamie Adjoua — Bouaké',
      exercices: [
        'Expliquer le mécanisme de la mitose en détaillant ses 4 phases.',
        'Quelle est la différence entre ADN et ARNm ? Rôle de chacun dans la synthèse protéique.',
      ],
    },
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (chronoActif) {
      interval = setInterval(() => setSecondes((s) => s + 1), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [chronoActif]);

  const formatTemps = () => {
    const m = Math.floor(secondes / 60).toString().padStart(2, '0');
    const s = (secondes % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const demarrerDevoir = (id: number) => {
    setDevoirActif(id);
    setSecondes(0);
    setReponse('');
    setChronoActif(true);
  };

  const soumettreCopie = () => {
    setChronoActif(false);
    Alert.alert(
      '🎉 Copie enregistrée !',
      `Bravo ! Sujet traité en ${formatTemps()}.\nContinue comme ça !`,
      [{ text: 'Super !', onPress: () => { setDevoirActif(null); setSecondes(0); } }]
    );
  };

  const devoir = DEVOIRS.find((d) => d.id === devoirActif);

  // ── Mode entraînement actif ───────────────────────────────────────────────
  if (devoirActif && devoir) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.btnAbandon}
            onPress={() => {
              setChronoActif(false);
              setDevoirActif(null);
            }}
          >
            <Text style={styles.btnAbandonText}>‹ Quitter</Text>
          </TouchableOpacity>
          <Text style={styles.topBarTitle} numberOfLines={1}>
            {devoir.matiere}
          </Text>
          <TouchableOpacity
            style={[styles.chronoBox, !chronoActif && styles.chronoBoxPause]}
            onPress={() => setChronoActif((v) => !v)}
          >
            <Text style={styles.chronoText}>
              {chronoActif ? '⏱️' : '⏸️'} {formatTemps()}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.sujetCard}>
            <Text style={styles.sujetEtabl}>{devoir.etablissement}</Text>
            <Text style={styles.sujetNiveau}>{devoir.matiere} · {devoir.niveau}</Text>
            <View style={styles.divider} />
            {devoir.exercices.map((exo, i) => (
              <Text key={i} style={styles.sujetExo}>
                <Text style={styles.exoNum}>Exercice {i + 1} :  </Text>
                {exo}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionLabel}>TON BLOC-NOTES</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Rédige ici tes calculs, formules, raisonnements..."
            placeholderTextColor="#555"
            value={reponse}
            onChangeText={setReponse}
          />

          <TouchableOpacity style={styles.btnValider} onPress={soumettreCopie}>
            <Text style={styles.btnValiderText}>✅ Terminer et enregistrer</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Liste des devoirs disponibles ─────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>📝 Devoirs</Text>
          <Text style={styles.subtitle}>Entraîne-toi sur de vrais sujets</Text>
        </View>

        <Text style={styles.sectionLabel}>SUJETS DISPONIBLES</Text>
        {DEVOIRS.map((d) => (
          <View key={d.id} style={styles.devoirCard}>
            <View style={styles.devoirInfo}>
              <Text style={styles.devoirMatiere}>{d.matiere}</Text>
              <Text style={styles.devoirDetails}>
                {d.niveau} · {d.etablissement}
              </Text>
              <Text style={styles.devoirExoCount}>
                {d.exercices.length} exercice{d.exercices.length > 1 ? 's' : ''}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnDemarrer}
              onPress={() => demarrerDevoir(d.id)}
            >
              <Text style={styles.btnDemarrerText}>▶ Démarrer</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>
            💡 Les devoirs sont partagés par des élèves KRAK de toute la Côte d'Ivoire.
            Bientôt tu pourras partager les tiens !
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: '#121214' },
  scroll:     { padding: 20, paddingBottom: 80 },
  header:     { marginBottom: 24 },
  title:      { fontSize: 30, fontWeight: 'bold', color: '#ffffff' },
  subtitle:   { fontSize: 14, color: '#8d8d99', marginTop: 4 },

  sectionLabel: {
    color: '#555', fontSize: 11, fontWeight: 'bold',
    letterSpacing: 1.5, marginBottom: 12,
  },

  devoirCard: {
    backgroundColor: '#202024', borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: '#29292e', marginBottom: 12,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  devoirInfo:      { flex: 1 },
  devoirMatiere:   { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  devoirDetails:   { color: '#8d8d99', fontSize: 13, marginTop: 3 },
  devoirExoCount:  { color: '#00875f', fontSize: 12, marginTop: 4, fontWeight: '600' },
  btnDemarrer:     {
    backgroundColor: '#00875f', paddingHorizontal: 14,
    paddingVertical: 10, borderRadius: 10,
  },
  btnDemarrerText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },

  // ── Mode entraînement ──
  topBar:     {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    borderBottomWidth: 1, borderColor: '#29292e', gap: 10,
  },
  btnAbandon:     { backgroundColor: '#202024', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnAbandonText: { color: '#ef4444', fontSize: 14, fontWeight: '600' },
  topBarTitle:    { color: '#fff', fontSize: 17, fontWeight: 'bold', flex: 1 },
  chronoBox:      {
    backgroundColor: '#1a1a1e', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: '#ff9800',
  },
  chronoBoxPause: { borderColor: '#555' },
  chronoText:     { color: '#ff9800', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 13 },

  sujetCard:    { backgroundColor: '#202024', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#29292e', marginBottom: 20 },
  sujetEtabl:   { color: '#fff', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
  sujetNiveau:  { color: '#8d8d99', fontSize: 12, textAlign: 'center', marginTop: 2 },
  divider:      { height: 1, backgroundColor: '#29292e', marginVertical: 12 },
  sujetExo:     { color: '#e1e1e6', fontSize: 14, lineHeight: 22, marginBottom: 14 },
  exoNum:       { fontWeight: 'bold', color: '#00875f' },

  input: {
    backgroundColor: '#202024', color: '#fff', padding: 16, borderRadius: 12,
    borderWidth: 1, borderColor: '#29292e', minHeight: 180,
    textAlignVertical: 'top', fontSize: 15, lineHeight: 22,
  },
  btnValider:     { backgroundColor: '#00875f', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 20, marginBottom: 20 },
  btnValiderText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  infoBanner: {
    marginTop: 12, backgroundColor: '#0d2318', borderRadius: 10,
    padding: 14, borderWidth: 1, borderColor: '#00875f33',
  },
  infoText: { color: '#6dba97', fontSize: 13, lineHeight: 20 },
});
