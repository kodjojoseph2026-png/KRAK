import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function MatiereNom() {
  const router = useRouter();
  const { nom } = useLocalSearchParams();
  const [ongletActif, setOngletActif] = useState('vidéos');

  // Contenu simulé pour chaque onglet
  const contenu = {
    vidéos: [
      { id: 1, titre: 'Introduction au cours', desc: 'Vidéo explicative' },
      { id: 2, titre: 'Exercice corrigé', desc: 'Méthode pas à pas' }
    ],
    fiches: [
      { id: 1, titre: 'Résumé du cours', desc: 'PDF - 2 pages' },
      { id: 2, titre: 'Formulaire', desc: 'Toutes les formules' }
    ],
    devoirs: [
      { id: 1, titre: 'Devoir n°1', desc: 'À rendre pour vendredi' }
    ]
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>‹ Retour</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>{nom}</Text>

      {/* Navigation Onglets */}
      <View style={styles.tabContainer}>
        {['vidéos', 'fiches', 'devoirs'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setOngletActif(tab)}>
            <Text style={[styles.tab, ongletActif === tab && styles.activeTab]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Liste dynamique */}
      <ScrollView>
        {contenu[ongletActif as keyof typeof contenu].map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.cardTitle}>{item.titre}</Text>
              <Text style={styles.cardSub}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214', padding: 20 },
  backButton: { marginBottom: 20, padding: 10, backgroundColor: '#202024', borderRadius: 8, alignSelf: 'flex-start' },
  backText: { color: '#ef4444', fontWeight: 'bold' },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tab: { color: '#888', fontSize: 16 },
  activeTab: { color: '#10b981', fontWeight: 'bold', borderBottomWidth: 2, borderBottomColor: '#10b981' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#1c1c1e', borderRadius: 10, marginBottom: 12 },
  avatar: { width: 40, height: 40, backgroundColor: '#333', borderRadius: 20, marginRight: 15 },
  cardTitle: { color: '#fff', fontWeight: '600' },
  cardSub: { color: '#aaa', fontSize: 12 }
});
