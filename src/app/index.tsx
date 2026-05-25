
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // L'outil magique pour changer de page

const PROGRAMME_IVOIRIEN = {
  '6ème': [
    { nom: 'Mathématiques', desc: 'Nombres entiers, décimaux, géométrie de base', couleur: '#3b82f6' },
    { nom: 'Physique - Chimie', desc: 'Sources de lumière, états de la matière', couleur: '#ef4444' },
    { nom: 'SVT', desc: 'Milieux naturels, respiration des êtres vivants', couleur: '#10b981' },
    { nom: 'Français', desc: 'Grammaire, conjugaison, lecture méthodique', couleur: '#a855f7' },
    { nom: 'Anglais', desc: 'Verb tenses, vocabulary, greeting basics', couleur: '#f59e0b' },
    { nom: 'Histoire - Géographie', desc: 'La préhistoire, étude du milieu local', couleur: '#06b6d4' },
    { nom: 'EDHC', desc: 'Droits de l’enfant, civisme et valeurs', couleur: '#ec4899' }
  ],
  '5ème': [
    { nom: 'Mathématiques', desc: 'Fractions, angles, symétrie centrale', couleur: '#3b82f6' },
    { nom: 'Physique - Chimie', desc: 'Combustions, intensité et tension du courant', couleur: '#ef4444' },
    { nom: 'SVT', desc: 'Alimentation des êtres vivants, les sols', couleur: '#10b981' },
    { nom: 'Français', desc: 'Texte narratif, dictée, vocabulaire', couleur: '#a855f7' },
    { nom: 'Anglais', desc: 'Present continuous, talking about daily routines', couleur: '#f59e0b' },
    { nom: 'Histoire - Géographie', desc: 'Les premiers empires africains, les climats', couleur: '#06b6d4' },
    { nom: 'EDHC', desc: 'Règles de vie en communauté, citoyenneté', couleur: '#ec4899' }
  ],
  '4ème': [
    { nom: 'Mathématiques', desc: 'Théorème de Pythagore, équations simples', couleur: '#3b82f6' },
    { nom: 'Physique - Chimie', desc: 'Molécules, atomes, lentilles et miroirs', couleur: '#ef4444' },
    { nom: 'SVT', desc: 'Reproduction chez l’homme, tectonique des plaques', couleur: '#10b981' },
    { nom: 'Français', desc: 'Texte argumentatif, résumé de texte', couleur: '#a855f7' },
    { nom: 'Anglais', desc: 'Past simple, comparative and superlative', couleur: '#f59e0b' },
    { nom: 'Histoire - Géographie', desc: 'Le relief et la population de Côte d’Ivoire', couleur: '#06b6d4' },
    { nom: 'Allemand / Espagnol', desc: 'Bases de la deuxième langue, grammaire', couleur: '#64748b' }
  ],
  '3ème': [
    { nom: 'Mathématiques (BEPC)', desc: 'Racines carrées, vecteurs, systèmes d’équations', couleur: '#3b82f6' },
    { nom: 'Physique - Chimie', desc: 'Poids et masse, solutions acides et basiques', couleur: '#ef4444' },
    { nom: 'SVT', desc: 'Immunologie, digestion, éducation à la santé', couleur: '#10b981' },
    { nom: 'Français', desc: 'Rédaction, étude d’œuvre intégrale', couleur: '#a855f7' },
    { nom: 'Anglais', desc: 'Passive voice, conditional sentences', couleur: '#f59e0b' },
    { nom: 'Histoire - Géographie', desc: 'La Côte d’Ivoire de la colonisation à l’indépendance', couleur: '#06b6d4' },
    { nom: 'Allemand / Espagnol', desc: 'Expression écrite et orale, vocabulaire BEPC', couleur: '#64748b' }
  ],
  '2nde A': [
    { nom: 'Français', desc: 'Analyse littéraire, commentaire composé, dissertation', couleur: '#a855f7' },
    { nom: 'Histoire - Géographie', desc: 'Démographie mondiale, histoire des civilisations', couleur: '#06b6d4' },
    { nom: 'Anglais', desc: 'Advanced grammar, text analysis, essays', couleur: '#f59e0b' },
    { nom: 'Allemand / Espagnol', desc: 'Étude de textes, grammaire approfondie', couleur: '#64748b' },
    { nom: 'Mathématiques', desc: 'Statistiques, équations, bases d’algèbre', couleur: '#3b82f6' },
    { nom: 'SVT', desc: 'Environnement et santé, dynamique terrestre', couleur: '#10b981' }
  ],
  '2nde C': [
    { nom: 'Mathématiques', desc: 'Vecteurs du plan, fonctions polynômes, repérage', couleur: '#3b82f6' },
    { nom: 'Physique - Chimie', desc: 'Loi d’Ohm, conductivité, les ions, équations chimiques', couleur: '#ef4444' },
    { nom: 'SVT', desc: 'Écosystèmes, géologie structurale', couleur: '#10b981' },
    { nom: 'Français', desc: 'Le commentaire composé, la dissertation', couleur: '#a855f7' },
    { nom: 'Histoire - Géographie', desc: 'Géographie économique, structures sociales', couleur: '#06b6d4' },
    { nom: 'Anglais', desc: 'Technical reading, vocabulary extension', couleur: '#f59e0b' }
  ],
  '1ère A': [
    { nom: 'Français', desc: 'Mouvements littéraires, contraction de texte', couleur: '#a855f7' },
    { nom: 'Histoire - Géographie', desc: 'La Côte d’Ivoire physique et humaine, histoire moderne', couleur: '#06b6d4' },
    { nom: 'Anglais', desc: 'Literature, debate and composition', couleur: '#f59e0b' },
    { nom: 'Allemand / Espagnol', desc: 'Littérature et culture de la langue choisie', couleur: '#64748b' },
    { nom: 'Philosophie', desc: 'Introduction à la pensée philosophique, les mythes', couleur: '#f43f5e' },
    { nom: 'Mathématiques', desc: 'Suites numériques, probabilités de base', couleur: '#3b82f6' }
  ],
  '1ère C/D': [
    { nom: 'Mathématiques', desc: 'Dérivabilité, limites, barycentre, trigonométrie', couleur: '#3b82f6' },
    { nom: 'Physique - Chimie', desc: 'Travail et puissance, chimie organique, lentilles', couleur: '#ef4444' },
    { nom: 'SVT', desc: 'Génétique formelle, physiologie nerveuse', couleur: '#10b981' },
    { nom: 'Français', desc: 'Techniques de la dissertation littéraire', couleur: '#a855f7' },
    { nom: 'Histoire - Géographie', desc: 'Étude économique des grandes puissances', couleur: '#06b6d4' }
  ],
  'Tle A': [
    { nom: 'Philosophie (BAC)', desc: 'La Conscience, l’État, la Liberté, la Vérité', couleur: '#f43f5e' },
    { nom: 'Français', desc: 'Œuvres intégrales, maîtrise du commentaire écrit', couleur: '#a855f7' },
    { nom: 'Histoire - Géographie', desc: 'Le monde de 1945 à nos jours, la Côte d’Ivoire moderne', couleur: '#06b6d4' },
    { nom: 'Anglais (Oral & Écrit)', desc: 'Exam preparation, advanced essays, oral fluency', couleur: '#f59e0b' },
    { nom: 'Allemand / Espagnol', desc: 'Commentaire de texte, traduction, épreuve BAC', couleur: '#64748b' },
    { nom: 'Mathématiques', desc: 'Analyse de fonctions simples, statistiques', couleur: '#3b82f6' }
  ],
  'Tle C': [
    { nom: 'Mathématiques (BAC)', desc: 'Nombres complexes, arithmétique, espaces vectoriels, intégrales', couleur: '#3b82f6' },
    { nom: 'Physique - Chimie', desc: 'Cinématique, forces centrales, électromagnétisme, pH-métrie', couleur: '#ef4444' },
    { nom: 'SVT', desc: 'Génétique humaine, évolution, géologie approfondie', couleur: '#10b981' },
    { nom: 'Philosophie', desc: 'Les grands courants philosophiques, méthodologie BAC', couleur: '#f43f5e' },
    { nom: 'Français', desc: 'Synthèse de documents, expression littéraire', couleur: '#a855f7' }
  ],
  'Tle D': [
    { nom: 'Mathématiques (BAC)', desc: 'Fonctions LN et Exponentielles, Probabilités, Suites', couleur: '#3b82f6' },
    { nom: 'Physique - Chimie', desc: 'Mécanique de Newton, estérification, saponification', couleur: '#ef4444' },
    { nom: 'SVT', desc: 'Évolution humaine, reproduction et endocrinologie', couleur: '#10b981' },
    { nom: 'Philosophie', desc: 'L’Homme, la Société, la Connaissance, la Morale', couleur: '#f43f5e' },
    { nom: 'Histoire - Géographie', desc: 'Relations internationales contemporaines', couleur: '#06b6d4' }
  ]
};

export default function HomeScreen() {
  const [classeSelectionnee, setClasseSelectionnee] = useState('2nde C');
  const router = useRouter(); // On initialise le routeur ici

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.header}>
          <Text style={styles.appTitle}>KRAK</Text>
          <Text style={styles.appSubtitle}>Le Programme Scolaire Ivoirien en un Clic</Text>
        </View>

        <Text style={styles.sectionTitle}>Sélectionne ta classe :</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.classesSelector}>
          {Object.keys(PROGRAMME_IVOIRIEN).map((classe) => (
            <TouchableOpacity 
              key={classe} 
              style={[
                styles.classeButton, 
                classeSelectionnee === classe && styles.classeButtonActive
              ]}
              onPress={() => setClasseSelectionnee(classe)}
            >
              <Text style={[
                styles.classeButtonText, 
                classeSelectionnee === classe && styles.classeButtonTextActive
              ]}>
                {classe}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.matieresHeader}>
          <Text style={styles.sectionTitle}>Matières — {classeSelectionnee}</Text>
          <Text style={styles.countBadge}>{PROGRAMME_IVOIRIEN[classeSelectionnee].length} cours disponibles</Text>
        </View>

        {PROGRAMME_IVOIRIEN[classeSelectionnee].map((matiere, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.card, { borderLeftColor: matiere.couleur }]}
            // L'action qui redirige l'élève vers notre nouvelle page avec le nom de la matière !
            onPress={() => router.push({ pathname: '/matiere/[nom]', params: { nom: matiere.nom } })}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{matiere.nom}</Text>
              <Text style={styles.cardDetails}>{matiere.desc}</Text>
            </View>
            <View style={styles.actionContainer}>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214' },
  scrollContainer: { padding: 20 },
  header: { marginTop: 10, marginBottom: 20 },
  appTitle: { fontSize: 38, fontWeight: 'bold', color: '#00875f', letterSpacing: 2 },
  appSubtitle: { fontSize: 15, color: '#8d8d99', marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#e1e1e6', marginBottom: 12 },
  classesSelector: { flexDirection: 'row', marginBottom: 25 },
  classeButton: { backgroundColor: '#202024', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#29292e' },
  classeButtonActive: { backgroundColor: '#00875f', borderColor: '#00875f' },
  classeButtonText: { color: '#a8a8b3', fontWeight: '600', fontSize: 14 },
  classeButtonTextActive: { color: '#ffffff' },
  matieresHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  countBadge: { color: '#00875f', fontSize: 13, fontWeight: '600' },
  card: { backgroundColor: '#202024', flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#29292e', borderLeftWidth: 6 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#ffffff' },
  cardDetails: { fontSize: 13, color: '#8d8d99', marginTop: 4, lineHeight: 18 },
  actionContainer: { justifyContent: 'center', alignItems: 'center' },
  arrow: { fontSize: 26, color: '#7c7c8a', paddingLeft: 10 }
});
