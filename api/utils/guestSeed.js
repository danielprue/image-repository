const guestImages = [
  {
    name: 'Succulent Fields',
    public_id: 'annie-spratt-8mqOw4DBBSg-unsplash_dvpfcb',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617842/annie-spratt-8mqOw4DBBSg-unsplash_dvpfcb.jpg',
    width: 3000,
    height: 4542,
    description: 'PC: https://unsplash.com/photos/8mqOw4DBBSg',
    tags: ['plants'],
    uploader: 0,
  },
  {
    name: 'Sad Dog on the Bed',
    public_id: 'roberto-nickson--s5WfAx74fM-unsplash_ojfnmu',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617840/roberto-nickson--s5WfAx74fM-unsplash_ojfnmu.jpg',
    width: 4480,
    height: 6720,
    description: 'PC: https://unsplash.com/photos/-s5WfAx74fM',
    tags: ['dogs'],
    uploader: 0,
  },
  {
    name: 'Clean Desk Setup',
    public_id: 'niclas-illg-wzVQp_NRIHg-unsplash_zfpuz1',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617839/niclas-illg-wzVQp_NRIHg-unsplash_zfpuz1.jpg',
    width: 3456,
    height: 4320,
    description: 'PC: https://unsplash.com/photos/wzVQp_NRIHg',
    tags: ['computers', 'plants'],
    uploader: 0,
  },
  {
    name: 'Fairy Lights Cat',
    public_id: 'jasmin-schuler-PUTVh0Z_qNQ-unsplash_mjf4r8',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617839/jasmin-schuler-PUTVh0Z_qNQ-unsplash_mjf4r8.jpg',
    width: 5522,
    height: 4015,
    description: 'PC: https://unsplash.com/photos/PUTVh0Z_qNQ',
    tags: ['cats'],
    uploader: 0,
  },
  {
    name: 'Two Dogs So Happy to See You',
    public_id: 'jay-wennington-CdK2eYhWfQ0-unsplash_ahthhs',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617839/jay-wennington-CdK2eYhWfQ0-unsplash_ahthhs.jpg',
    width: 4000,
    height: 6000,
    description: 'PC: https://unsplash.com/photos/CdK2eYhWfQ0',
    tags: ['dogs'],
    uploader: 0,
  },
  {
    name: 'A Single Leaf',
    public_id: 'sarah-dorweiler-9Z1KRIfpBTM-unsplash_o6mghf',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617839/sarah-dorweiler-9Z1KRIfpBTM-unsplash_o6mghf.jpg',
    width: 4272,
    height: 2848,
    description: 'PC: https://unsplash.com/photos/9Z1KRIfpBTM',
    tags: ['plants'],
    uploader: 0,
  },
  {
    name: 'Cat in the Grass',
    public_id: 'raquel-pedrotti-AHgpNYkX9dc-unsplash_ei0yny',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617838/raquel-pedrotti-AHgpNYkX9dc-unsplash_ei0yny.jpg',
    width: 5184,
    height: 3456,
    description: 'PC: https://unsplash.com/photos/AHgpNYkX9dc',
    tags: ['cats', 'plants'],
    uploader: 0,
  },
  {
    name: 'Dog Side Eye',
    public_id: 'ash-goldsbrough-v0_MCllHY9M-unsplash_aknjsz',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617837/ash-goldsbrough-v0_MCllHY9M-unsplash_aknjsz.jpg',
    width: 3024,
    height: 4032,
    description: 'PC: https://unsplash.com/photos/v0_MCllHY9M',
    tags: ['dogs'],
    uploader: 0,
  },
  {
    name: 'Indoor Gardening',
    public_id: 'kaufmann-mercantile-a7Woj8W6J0s-unsplash_vswe2y',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617837/kaufmann-mercantile-a7Woj8W6J0s-unsplash_vswe2y.jpg',
    width: 4197,
    height: 2860,
    description: 'PC: https://unsplash.com/photos/a7Woj8W6J0s',
    tags: ['plants'],
    uploader: 0,
  },
  {
    name: 'Dog Professional',
    public_id: 'cookie-the-pom-gySMaocSdqs-unsplash_kw6mfl',
    image_path:
      'https://res.cloudinary.com/devm7fql3/image/upload/v1610617836/cookie-the-pom-gySMaocSdqs-unsplash_kw6mfl.jpg',
    width: 4752,
    height: 3168,
    description: 'PC: https://unsplash.com/photos/gySMaocSdqs',
    tags: ['dogs', 'computers'],
    uploader: 0,
  },
];

const guestSeed = (user) => {
  return guestImages.map((image) => {
    return { ...image, uploader: user };
  });
};

module.exports = {
  guestSeed,
};
