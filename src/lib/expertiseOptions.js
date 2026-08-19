export const EXPERTISE_OPTIONS = [
'Frontend Developer',
'Backend Developer',
'Full Stack Developer',
'Mobile Developer',
'UI/UX Designer',
'Graphic Designer',
'Video Editor',
'Videographer',
'Photographer',
'Photo Editor',
'Motion Graphics Designer',
'Sound Engineer',
];

export const SKILLS_BY_EXPERTISE = {
'Frontend Developer': ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'React', 'Next.js', 'Vue', 'Tailwind CSS'],
'Backend Developer': ['Node.js', 'Express', 'Python', 'Django', 'MongoDB', 'PostgreSQL', 'REST APIs', 'GraphQL'],
'Full Stack Developer': ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Next.js'],
'Mobile Developer': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS', 'Android'],
'UI/UX Designer': ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
'Graphic Designer': ['Photoshop', 'Illustrator', 'InDesign', 'Branding', 'Typography'],
'Video Editor': ['Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve', 'Color Grading', 'Motion Graphics'],
'Videographer': ['Cinematography', 'Lighting', 'Camera Operation', 'Drone Operation', 'Live Event Coverage'],
'Photographer': ['Portrait Photography', 'Event Photography', 'Product Photography', 'Lighting', 'Composition'],
'Photo Editor': ['Photoshop', 'Lightroom', 'Retouching', 'Color Correction'],
'Motion Graphics Designer': ['After Effects', 'Cinema 4D', 'Animation', 'Motion Design'],
'Sound Engineer': ['Pro Tools', 'Audition', 'Sound Mixing', 'Sound Design', 'Foley'],
};

// Returns a deduplicated skill suggestion list for whichever expertise areas are selected
export function getSkillsForExpertise(selectedExpertise = []) {
const all = selectedExpertise.flatMap((area) => SKILLS_BY_EXPERTISE[area] || []);
return [...new Set(all)];
}