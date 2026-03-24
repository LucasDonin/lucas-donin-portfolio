import { useState, useEffect } from 'react';
import { supabase, type Project, parseTags, parseImages } from '@/lib/supabase';

const EMPTY_FORM = {
  title: '', slug: '', category: '', description: '',
  full_description: '', cover_image: '', images: '',
  tags: '', behance_url: '', order: 0, published: true,
};

function slugify(str: string) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  async function load() {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('order', { ascending: true });
    if (data) setProjects(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setView('form');
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({
      title: p.title, slug: p.slug, category: p.category,
      description: p.description, full_description: p.full_description || '',
      cover_image: p.cover_image || '', images: p.images || '',
      tags: p.tags || '', behance_url: p.behance_url || '',
      order: p.order, published: p.published,
    });
    setView('form');
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, slug: form.slug || slugify(form.title) };
    const { error } = editing
      ? await supabase.from('projects').update(payload).eq('id', editing.id)
      : await supabase.from('projects').insert(payload);
    setSaving(false);
    if (error) { setMsg('Erro: ' + error.message); }
    else {
      setMsg(editing ? 'Projeto atualizado!' : 'Projeto criado!');
      setView('list');
      load();
      setTimeout(() => setMsg(''), 3000);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que quer remover este projeto?')) return;
    await supabase.from('projects').delete().eq('id', id);
    load();
  }

  async function togglePublished(p: Project) {
    await supabase.from('projects').update({ published: !p.published }).eq('id', p.id);
    load();
  }

  const F = (k: keyof typeof form, v: string | number | boolean) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.10)',
    color: '#D2D2D2',
    borderRadius: '10px',
    padding: '10px 14px',
    width: '100%',
    fontSize: '14px',
    outline: 'none',
  };
  const labelStyle = {
    display: 'block', fontSize: '11px', letterSpacing: '0.15em',
    textTransform: 'uppercase' as const, color: '#666', marginBottom: '6px',
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ background: 'rgba(30,30,30,0.95)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo-donin.svg" alt="Donindesign" style={{ height: '28px', filter: 'brightness(10)' }} />
            <span style={{ color: 'oklch(0.78 0.14 88)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {view === 'list' ? (
              <button onClick={openNew}
                style={{ background: 'oklch(0.78 0.14 88)', color: '#242424', border: 'none', borderRadius: '10px', padding: '8px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                + Novo projeto
              </button>
            ) : (
              <button onClick={() => setView('list')}
                style={{ background: 'rgba(255,255,255,0.07)', color: '#D2D2D2', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '10px', padding: '8px 18px', fontSize: '13px', cursor: 'pointer' }}>
                {'\u2190'} Voltar
              </button>
            )}
            <button onClick={() => { sessionStorage.removeItem('admin_auth'); onLogout(); }}
              style={{ background: 'none', border: 'none', color: '#555', fontSize: '12px', cursor: 'pointer' }}>
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {msg && (
          <div style={{ background: 'oklch(0.78 0.14 88 / 0.15)', border: '1px solid oklch(0.78 0.14 88 / 0.4)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', color: 'oklch(0.78 0.14 88)', fontSize: '14px' }}>
            {msg}
          </div>
        )}

        {/* LIST VIEW */}
        {view === 'list' && (
          <>
            <h1 style={{ color: '#D2D2D2', fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
              Projetos <span style={{ color: '#555', fontSize: '16px', fontWeight: 400 }}>({projects.length})</span>
            </h1>
            {loading ? (
              <p style={{ color: '#555' }}>Carregando...</p>
            ) : projects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#555' }}>
                <p style={{ marginBottom: '16px' }}>Nenhum projeto ainda.</p>
                <button onClick={openNew} style={{ background: 'oklch(0.78 0.14 88)', color: '#242424', border: 'none', borderRadius: '10px', padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }}>
                  Criar primeiro projeto
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {projects.map(p => (
                  <div key={p.id} style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px',
                  }}>
                    {p.cover_image && (
                      <img src={p.cover_image} alt={p.title} style={{ width: '72px', height: '48px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: '#D2D2D2', fontWeight: 600, fontSize: '15px', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                      <p style={{ color: '#666', fontSize: '12px' }}>{p.category} · /{p.slug}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <button onClick={() => togglePublished(p)}
                        style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 600,
                          background: p.published ? 'oklch(0.78 0.14 88 / 0.15)' : 'rgba(255,255,255,0.05)',
                          color: p.published ? 'oklch(0.78 0.14 88)' : '#555' }}>
                        {p.published ? 'Publicado' : 'Rascunho'}
                      </button>
                      <button onClick={() => openEdit(p)}
                        style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.05)', color: '#D2D2D2', cursor: 'pointer' }}>
                        Editar
                      </button>
                      <button onClick={() => handleDelete(p.id)}
                        style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(226,75,74,0.3)', background: 'rgba(226,75,74,0.08)', color: '#e24b4a', cursor: 'pointer' }}>
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* FORM VIEW */}
        {view === 'form' && (
          <form onSubmit={handleSave} style={{ maxWidth: '720px' }}>
            <h1 style={{ color: '#D2D2D2', fontSize: '22px', fontWeight: 700, marginBottom: '28px' }}>
              {editing ? 'Editar projeto' : 'Novo projeto'}
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Título *</label>
                <input style={inputStyle} value={form.title} required
                  onChange={e => { F('title', e.target.value); if (!editing) F('slug', slugify(e.target.value)); }} />
              </div>
              <div>
                <label style={labelStyle}>Slug (URL)</label>
                <input style={inputStyle} value={form.slug} placeholder="gerado automaticamente"
                  onChange={e => F('slug', e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Categoria</label>
                <input style={inputStyle} value={form.category} placeholder="Branding & Packaging"
                  onChange={e => F('category', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Ordem</label>
                <input type="number" style={inputStyle} value={form.order}
                  onChange={e => F('order', parseInt(e.target.value))} />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Descrição curta (aparece no card) *</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={form.description} required
                onChange={e => F('description', e.target.value)} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Descrição completa (página do projeto)</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }} value={form.full_description}
                placeholder="Conte a história do projeto, desafios, soluções..."
                onChange={e => F('full_description', e.target.value)} />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Imagem de capa (URL)</label>
              <input style={inputStyle} value={form.cover_image} placeholder="https://..."
                onChange={e => F('cover_image', e.target.value)} />
              {form.cover_image && (
                <img src={form.cover_image} alt="preview" style={{ marginTop: '8px', height: '120px', borderRadius: '8px', objectFit: 'cover' }} />
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Imagens extras (URLs separadas por vírgula)</label>
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={form.images}
                placeholder="https://img1.jpg, https://img2.jpg, https://img3.jpg"
                onChange={e => F('images', e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Tags (separadas por vírgula)</label>
                <input style={inputStyle} value={form.tags} placeholder="Branding, Packaging, Logo"
                  onChange={e => F('tags', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Link Behance</label>
                <input style={inputStyle} value={form.behance_url} placeholder="https://behance.net/..."
                  onChange={e => F('behance_url', e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <input type="checkbox" id="pub" checked={form.published}
                onChange={e => F('published', e.target.checked)} style={{ width: '16px', height: '16px', accentColor: 'oklch(0.78 0.14 88)' }} />
              <label htmlFor="pub" style={{ color: '#999', fontSize: '14px', cursor: 'pointer' }}>
                Publicado (visível no site)
              </label>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" disabled={saving}
                style={{ background: 'oklch(0.78 0.14 88)', color: '#242424', border: 'none', borderRadius: '10px', padding: '12px 28px', fontWeight: 700, fontSize: '14px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Salvando...' : editing ? 'Salvar alterações' : 'Criar projeto'}
              </button>
              <button type="button" onClick={() => setView('list')}
                style={{ background: 'rgba(255,255,255,0.05)', color: '#999', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '10px', padding: '12px 20px', fontSize: '14px', cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
