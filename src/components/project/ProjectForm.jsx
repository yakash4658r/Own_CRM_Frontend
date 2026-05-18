import React from 'react';
import { Lock, Save } from 'lucide-react';
import Card from '../ui/Card';
import { Input, Select, Textarea } from '../ui/FormFields';
import { RadioCards, RadioPills } from '../ui/RadioCards';
import AppendOnlyNotes from './AppendOnlyNotes';
import {
  DOMAIN_PROVIDERS,
  HOSTING_PROVIDERS,
  GITHUB_ACCESS_TYPES,
  GITHUB_ACCOUNT_OWNERS,
  DO_PLANS,
} from '../../utils/projectFormConfig';

function FormSection({ step, title, description, children }) {
  return (
    <Card className="p-6 sm:p-8 animate-slide-up">
      <div className="flex items-start gap-4 mb-6 pb-6 border-b border-white/[0.06]">
        <span className="section-number">{step}</span>
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description && <p className="text-zinc-500 text-sm mt-1">{description}</p>}
        </div>
      </div>
      {children}
    </Card>
  );
}

export default function ProjectForm({ formData, setFormData, isEdit = false }) {
  const set = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === 'checkbox' ? checked : value);
  };

  const domainOptions = DOMAIN_PROVIDERS.map((p) => ({
    value: p.value,
    label: p.label,
    description: p.value === 'Other' ? 'Specify custom registrar below' : undefined,
  }));

  const hostingOptions = HOSTING_PROVIDERS.map((p) => ({
    value: p.value,
    label: p.label,
  }));

  const doPlanOptions = DO_PLANS.map((plan) => ({
    value: plan.id,
    label: plan.label,
    description: plan.specs,
    disabled: plan.disabled,
  }));

  return (
    <div className="space-y-6">
      <FormSection step="1" title="Project basics" description="Name, client, stack, files, and billing.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Project Name *" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Client Name *" name="clientName" value={formData.clientName} onChange={handleChange} required />
          <Input label="Tech Stack" name="stack" value={formData.stack} onChange={handleChange} placeholder="MERN, WordPress, Next.js..." />
          <Input label="Files / project path" name="fileLocation" value={formData.fileLocation} onChange={handleChange} placeholder="/projects/client-name" />
          <Input label="Start date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <Input label="Deadline" type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
          <Input label="Price (USD)" type="number" name="price" min="0" value={formData.price} onChange={handleChange} />
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { label: 'Ongoing', value: 'Ongoing' },
              { label: 'Completed', value: 'Completed' },
              { label: 'On Hold', value: 'On Hold' },
              { label: 'Cancelled', value: 'Cancelled' },
            ]}
          />
          <Select
            label="Payment"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            options={[
              { label: 'Unpaid', value: 'Unpaid' },
              { label: 'Partial', value: 'Partial' },
              { label: 'Paid', value: 'Paid' },
            ]}
          />
        </div>
      </FormSection>

      <FormSection step="2" title="Domain" description="Registrar, account, and expiry.">
        <div className="space-y-5">
          <Input label="Domain name" name="domainName" value={formData.domainName} onChange={handleChange} placeholder="example.com" />
          <RadioCards
            label="Domain provider"
            name="domainProvider"
            value={formData.domainProvider}
            onChange={(v) => set('domainProvider', v)}
            options={domainOptions}
            columns={2}
          />
          {formData.domainProvider === 'Other' && (
            <Input
              label="Other provider name"
              name="domainProviderOther"
              value={formData.domainProviderOther}
              onChange={handleChange}
              placeholder="e.g. Cloudflare Registrar"
            />
          )}
          <Input
            label="Email or account"
            name="domainAccount"
            type="email"
            value={formData.domainAccount}
            onChange={handleChange}
            placeholder="account@gmail.com"
          />
          <Input label="Expiry date" type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
        </div>
      </FormSection>

      <FormSection step="3" title="Hosting" description="DigitalOcean droplet or GitHub repository.">
        <div className="space-y-6">
          <RadioCards
            label="Hosting provider"
            name="hostingProvider"
            value={formData.hostingProvider}
            onChange={(v) => set('hostingProvider', v)}
            options={hostingOptions}
            columns={3}
          />
          {formData.hostingProvider === 'Other' && (
            <Input
              label="Other hosting (specify)"
              name="hostingProviderOther"
              value={formData.hostingProviderOther}
              onChange={handleChange}
            />
          )}

          {formData.hostingProvider === 'Digital Ocean' && (
            <div className="space-y-5 pt-4 border-t border-white/[0.06]">
              <Input label="Droplet ID" name="doDropletId" value={formData.doDropletId} onChange={handleChange} />
              <Input
                label="Droplet password"
                name="doDropletPassword"
                type="password"
                value={formData.doDropletPassword}
                onChange={handleChange}
                placeholder={isEdit ? 'Leave blank to keep current password' : ''}
              />
              <Input
                label="Droplet account owner name"
                name="doDropletOwnerName"
                value={formData.doDropletOwnerName}
                onChange={handleChange}
                placeholder="Who owns this droplet account?"
              />
              <RadioCards
                label="Select a plan"
                name="doPlanId"
                value={formData.doPlanId}
                onChange={(v) => set('doPlanId', v)}
                options={doPlanOptions}
                columns={1}
              />
              {formData.doPlanId === 'do-other' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="Custom plan name" name="doPlanCustomLabel" value={formData.doPlanCustomLabel} onChange={handleChange} />
                  <Input label="Monthly cost ($)" type="number" min="0" name="doPlanCustomPrice" value={formData.doPlanCustomPrice} onChange={handleChange} />
                  <div className="md:col-span-2">
                    <Textarea label="Custom plan specs" name="doPlanCustomSpecs" value={formData.doPlanCustomSpecs} onChange={handleChange} rows={2} />
                  </div>
                </div>
              )}
            </div>
          )}

          {formData.hostingProvider === 'Github' && (
            <div className="space-y-5 pt-4 border-t border-white/[0.06]">
              <Input label="GitHub username" name="ghUsername" value={formData.ghUsername} onChange={handleChange} />
              <RadioPills
                label="Account access via"
                name="ghAccessType"
                value={formData.ghAccessType}
                onChange={(v) => set('ghAccessType', v)}
                options={GITHUB_ACCESS_TYPES}
              />
              {formData.ghAccessType === 'email' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input label="GitHub email" name="ghEmail" type="email" value={formData.ghEmail} onChange={handleChange} />
                  <Input
                    label="GitHub password"
                    name="ghPassword"
                    type="password"
                    value={formData.ghPassword}
                    onChange={handleChange}
                    placeholder={isEdit ? 'Leave blank to keep' : ''}
                  />
                </div>
              )}
              <Input label="Repository name / URL" name="ghRepoName" value={formData.ghRepoName} onChange={handleChange} />
              <RadioPills
                label="GitHub account belongs to"
                name="ghAccountOwner"
                value={formData.ghAccountOwner}
                onChange={(v) => set('ghAccountOwner', v)}
                options={GITHUB_ACCOUNT_OWNERS}
              />
            </div>
          )}
        </div>
      </FormSection>

      <FormSection step="4" title="Credentials" description="Database, API keys — encrypted in vault.">
        <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 w-fit">
          <Lock className="w-4 h-4 text-accent-light" />
          <span className="text-xs font-mono text-accent-light uppercase tracking-wider">AES-256 encrypted</span>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Database username"
              name="dbUsername"
              value={formData.dbUsername}
              onChange={handleChange}
              placeholder={isEdit ? 'Leave blank to keep' : ''}
            />
            <Input
              label="Database password"
              name="dbPassword"
              type="password"
              value={formData.dbPassword}
              onChange={handleChange}
              placeholder={isEdit ? 'Leave blank to keep' : ''}
            />
          </div>
          <AppendOnlyNotes
            label="Database notes pad"
            description="IDs, links, connection strings. Saved lines cannot be deleted — only add new notes."
            existing={formData._existingDatabaseNotes}
            appendValue={formData.databaseNotesAppend}
            onAppendChange={(v) => set('databaseNotesAppend', v)}
            placeholder="Paste DB host, important IDs, admin URLs..."
          />
          <Input
            label="API key (paste here)"
            name="apiKey"
            value={formData.apiKey}
            onChange={handleChange}
            placeholder={isEdit ? 'Leave blank to keep existing key' : 'sk_live_...'}
          />
          <AppendOnlyNotes
            label="API notes pad"
            description="Extra API context. Previous notes stay saved."
            existing={formData._existingApiNotes}
            appendValue={formData.apiNotesAppend}
            onAppendChange={(v) => set('apiNotesAppend', v)}
            placeholder="Which service, scopes, webhook URLs..."
          />
        </div>
      </FormSection>

      <FormSection step="5" title="Final notes" description="General instructions for this project.">
        <Textarea name="notes" value={formData.notes} onChange={handleChange} rows={5} placeholder="Deployment steps, client requests, reminders..." />
      </FormSection>
    </div>
  );
}
