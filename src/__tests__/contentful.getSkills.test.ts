describe('getSkills', () => {
  it('fetches habilidad entries with correct locale and maps to Skill[]', async () => {
    jest.resetModules();
    process.env.VITE_CONTENTFUL_SPACE_ID = 'space';
    process.env.VITE_CONTENTFUL_ACCESS_TOKEN = 'token';

    const mockGetEntries = jest.fn().mockResolvedValue({
      items: [
        {
          sys: { id: 'skill-1' },
          fields: {
            nombre: 'React',
            categoria: ['Frontend'],
            nivel: 80,
            iconoUrl: 'https://example.com/react.png',
            imagen: {
              sys: { id: 'asset-1' },
              metadata: {},
              fields: {
                title: 'React',
                file: {
                  url: '//images.ctfassets.net/react.png',
                  details: { size: 1 },
                  fileName: 'react.png',
                  contentType: 'image/png',
                },
              },
            },
            descripcion: '3 years of experience',
            destacada: true,
            orden: 1,
          },
        },
      ],
    });

    jest.doMock('contentful', () => ({
      createClient: () => ({
        getEntries: mockGetEntries,
      }),
    }));

    const { getSkills } = await import('../services/contentful');
    const skills = await getSkills('es');

    expect(mockGetEntries).toHaveBeenCalledWith(
      expect.objectContaining({
        content_type: 'habilidad',
        locale: 'es-CO',
      })
    );

    expect(skills).toEqual([
      expect.objectContaining({
        id: 'skill-1',
        nombre: 'React',
        categoria: ['Frontend'],
        nivel: 80,
        iconoUrl: 'https://example.com/react.png',
        imagenUrl: 'https://images.ctfassets.net/react.png',
        descripcion: '3 years of experience',
        destacada: true,
        orden: 1,
      }),
    ]);
  });
});
