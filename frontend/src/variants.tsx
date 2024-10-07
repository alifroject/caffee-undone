const fadeIn = (direction: 'left' | 'right' | 'up' | 'down', delay: string) => {
  return {
      hidden: {
          y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
          x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      },
      show: {
          y: 0,
          x: 0,
          opacity: 1, // Memperbaiki penulisan 'opacity'
          transition: { // Memperbaiki penulisan 'transition'
              type: 'tween',
              duration: 1.2,
              delay: parseFloat(delay), // Mengubah string ke number jika delay adalah string
              ease: [0.25, 0.25, 0.25, 0.75],
          }
      }
  };
};

export default fadeIn; // Pastikan untuk mengekspor fungsi ini
