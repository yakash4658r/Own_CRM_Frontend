export const DOMAIN_PROVIDERS = [
  { value: 'GoDaddy', label: 'GoDaddy' },
  { value: 'Hostinger', label: 'Hostinger' },
  { value: 'Namecheap', label: 'Namecheap' },
  { value: 'Name.com', label: 'Name.com' },
  { value: 'Other', label: 'Other' },
];

export const HOSTING_PROVIDERS = [
  { value: 'Digital Ocean', label: 'Digital Ocean' },
  { value: 'Github', label: 'GitHub' },
  { value: 'Other', label: 'Other' },
];

export const GITHUB_ACCESS_TYPES = [
  { value: 'google', label: 'Google account access' },
  { value: 'email', label: 'Separate email & password' },
];

export const GITHUB_ACCOUNT_OWNERS = [
  { value: 'Client', label: 'Client' },
  { value: 'Critictech', label: 'Critictech' },
  { value: 'Yakash', label: 'Yakash' },
];

export const DO_PLANS = [
  { id: 'do-4', price: 4, label: '$4.00/mo', specs: '1 vCPU · 512 MB RAM · 10 GB SSD · 500 GB transfer' },
  { id: 'do-6', price: 6, label: '$6.00/mo', specs: '1 vCPU · 1 GB RAM · 25 GB SSD · 1000 GB transfer' },
  { id: 'do-12', price: 12, label: '$12.00/mo', specs: '1 vCPU · 2 GB RAM · 50 GB SSD · 2 TB transfer' },
  { id: 'do-18', price: 18, label: '$18.00/mo', specs: '2 vCPU · 2 GB RAM · 60 GB SSD · 3 TB transfer' },
  { id: 'do-24', price: 24, label: '$24.00/mo', specs: '2 vCPU · 4 GB RAM · 80 GB SSD · 4 TB transfer' },
  { id: 'do-48', price: 48, label: '$48.00/mo', specs: '4 vCPU · 8 GB RAM · 160 GB SSD · 5 TB transfer' },
  { id: 'do-96', price: 96, label: '$96.00/mo', specs: '8 vCPU · 16 GB RAM · 320 GB SSD · 6 TB transfer', disabled: false },
  { id: 'do-other', price: 0, label: 'Other plan', specs: 'Custom monthly cost & specs', isOther: true },
];

export const initialProjectForm = {
  name: '',
  clientName: '',
  startDate: '',
  deadline: '',
  status: 'Ongoing',
  stack: '',
  fileLocation: '',
  price: '',
  paymentStatus: 'Unpaid',
  domainName: '',
  domainProvider: 'GoDaddy',
  domainProviderOther: '',
  domainAccount: '',
  expiryDate: '',
  renewalReminder: true,
  hostingProvider: 'Digital Ocean',
  hostingProviderOther: '',
  doDropletId: '',
  doDropletPassword: '',
  doDropletOwnerName: '',
  doPlanId: 'do-4',
  doPlanCustomLabel: '',
  doPlanCustomPrice: '',
  doPlanCustomSpecs: '',
  ghUsername: '',
  ghAccessType: 'google',
  ghEmail: '',
  ghPassword: '',
  ghRepoName: '',
  ghAccountOwner: 'Critictech',
  dbUsername: '',
  dbPassword: '',
  databaseNotesAppend: '',
  apiKey: '',
  apiNotesAppend: '',
  notes: '',
};

export function projectToForm(project) {
  if (!project) return { ...initialProjectForm };
  const d = project.domain || {};
  const h = project.hosting || {};
  const c = project.credentials || {};

  return {
    name: project.name || '',
    clientName: project.clientName || '',
    startDate: project.startDate ? project.startDate.slice(0, 10) : '',
    deadline: project.deadline ? project.deadline.slice(0, 10) : '',
    status: project.status || 'Ongoing',
    stack: project.stack || '',
    fileLocation: project.fileLocation || '',
    price: project.price ?? '',
    paymentStatus: project.paymentStatus || 'Unpaid',
    domainName: d.name || '',
    domainProvider: DOMAIN_PROVIDERS.some((p) => p.value === d.provider) ? d.provider : d.provider ? 'Other' : 'GoDaddy',
    domainProviderOther: DOMAIN_PROVIDERS.some((p) => p.value === d.provider) ? '' : d.providerOther || d.provider || '',
    domainAccount: d.accountEmail || d.registeredGmail || '',
    expiryDate: d.expiryDate ? String(d.expiryDate).slice(0, 10) : '',
    renewalReminder: d.renewalReminder !== false,
    hostingProvider: h.provider || 'Digital Ocean',
    hostingProviderOther: h.providerOther || '',
    doDropletId: h.dropletId || '',
    doDropletPassword: '',
    doDropletOwnerName: h.dropletOwnerName || '',
    doPlanId: h.dropletPlanId || 'do-4',
    doPlanCustomLabel: h.dropletPlanCustomLabel || '',
    doPlanCustomPrice: h.dropletPlanCustomMonthly ?? '',
    doPlanCustomSpecs: h.dropletPlanCustomSpecs || '',
    ghUsername: h.ghUsername || h.accountName || '',
    ghAccessType: h.ghAccessType || 'google',
    ghEmail: h.ghEmail || h.accountEmail || '',
    ghPassword: '',
    ghRepoName: h.ghRepoName || h.repoLink || '',
    ghAccountOwner: h.ghAccountOwner || 'Critictech',
    dbUsername: '',
    dbPassword: '',
    databaseNotesAppend: '',
    apiKey: '',
    apiNotesAppend: '',
    notes: project.notes || '',
    _existingDatabaseNotes: c.decryptedDatabaseNotes || '',
    _existingApiNotes: c.decryptedApiNotes || '',
  };
}
