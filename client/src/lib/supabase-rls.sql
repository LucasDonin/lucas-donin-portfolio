-- Permitir leitura pública dos projetos publicados
create policy "Public can read published projects"
on projects for select
using (published = true);

-- Permitir tudo para usuários autenticados (admin)
create policy "Authenticated users can do everything"
on projects for all
using (auth.role() = 'authenticated');
