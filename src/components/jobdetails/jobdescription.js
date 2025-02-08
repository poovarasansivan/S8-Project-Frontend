export default function JobDescription() {
    const sections = [
      {
        title: 'Description',
        content: `We are looking to hire a skilled software developer to build and maintain websites for our clients. As a Software developer, you will be responsible for liaising with the design team, setting up Magento 1x and 2x sites, building modules and customizing extensions, testing the performance of each site, and maintaining security and feature updates after the installation is complete.`,
      },
      {
        title: 'Responsibilities',
        items: [
          'Meeting with the design team to discuss the needs of the company.',
          'Building and configuring Magento 1x and 2x eCommerce websites.',
          'Coding of the Magento templates.',
          'Developing Magento modules in PHP using best practices.',
          'Designing themes and interfaces.',
          'Setting performance tasks and goals.',
          'Updating website features and security patches.',
        ],
      },
      {
        title: 'Requirements',
        items: [
          "Bachelor's degree in computer science or related field.",
          'Advanced knowledge of Magento, JavaScript, HTML, PHP, CSS, and MySQL.',
          'Experience with complete eCommerce lifecycle development.',
          'Understanding of modern UI/UX trends.',
          'Knowledge of Google Tag Manager, SEO, Google Analytics, PPC, and A/B Testing.',
          'Good working knowledge of Adobe Photoshop and Adobe Illustrator.',
          'Strong attention to detail.',
          'Ability to project-manage and work to strict deadlines.',
          'Ability to work in a team environment.',
        ],
      },
      {
        title: 'Qualification',
        items: [
          'B.E/B.TECH in Any Tier I/II College.',
          '0-1 more years of professional design experience',
          'Advanced degree or equivalent experience in graphic and web design',
        ],
      },
      {
        title: 'Skill & Experience',
        items: [
          'Understanding of key Design Principal',
          'Proficiency With HTML, CSS, Bootstrap',
          'WordPress: 1 year (optional)',
          'Experience designing and developing responsive design websites',
          'Web designing: 1 year (optional)',
        ],
      },
    ];
  
    return (
      <div className="space-y-6">
        {sections.map((section, index) => (
          <section key={index}>
            <h2 className="mb-3 text-lg font-semibold text-gray-800">{section.title}</h2>
            {section.content ? (
              <p className="text-gray-700">{section.content}</p>
            ) : (
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    );
  }
  