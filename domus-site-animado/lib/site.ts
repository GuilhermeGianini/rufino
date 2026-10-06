/**
 * Dados do site. Para atualizar contatos, depoimentos ou as fotos de antes e depois,
 * edite apenas este arquivo. Campos vazios ("") ficam ocultos no site.
 */
export const site = {
  name: 'Domus Trama Decor',
  whatsapp: '5511993687070',
  phoneDisplay: '(11) 99368-7070',
  email: '',
  hours: '',
  instagram: '',
  serviceArea: '',
  legalName: '',
}

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

/**
 * Empresas atendidas, exibidas em loop. Use somente empresas reais, com autorização.
 * Os itens entre colchetes são exemplos para visualizar o efeito: troque pelos nomes reais
 * ou deixe a lista vazia ([]) para esconder a faixa.
 */
export const clients: { name: string; type?: string }[] = [
  { name: '[Empresa 1]', type: 'Condomínio' },
  { name: '[Empresa 2]', type: 'Escritório' },
  { name: '[Empresa 3]', type: 'Hotel' },
  { name: '[Empresa 4]', type: 'Clínica' },
  { name: '[Empresa 5]', type: 'Restaurante' },
]

export const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#antes-depois', label: 'Antes e depois' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#projetos', label: 'Trabalhos' },
  { href: '#duvidas', label: 'Dúvidas' },
]

export type GalleryCategory = 'cortina' | 'persiana' | 'almofada'

export const gallery: {
  src: string
  alt: string
  title: string
  place: string
  cat: GalleryCategory
  w: number
  h: number
}[] = [
  { src: '/images/g01.webp', alt: 'Prega wave na sala de estar', title: 'Prega wave', place: 'Sala de estar', cat: 'cortina', w: 619, h: 1100 },
  { src: '/images/g02.webp', alt: 'Persiana rolô na varanda', title: 'Persiana rolô', place: 'Varanda', cat: 'persiana', w: 618, h: 1100 },
  { src: '/images/g03.webp', alt: 'Almofadas em azul e areia', title: 'Almofadas', place: 'Azul e areia', cat: 'almofada', w: 1100, h: 1100 },
  { src: '/images/g04.webp', alt: 'Prega fêmea em pé-direito alto', title: 'Prega fêmea', place: 'Pé-direito alto', cat: 'cortina', w: 618, h: 1100 },
  { src: '/images/g05.webp', alt: 'Persiana romana no quarto', title: 'Persiana romana', place: 'Quarto', cat: 'persiana', w: 618, h: 1100 },
  { src: '/images/g06.webp', alt: 'Cortina em voil na sala', title: 'Cortina em voil', place: 'Sala de estar', cat: 'cortina', w: 618, h: 1100 },
  { src: '/images/g07.webp', alt: 'Detalhe de prega americana', title: 'Prega americana', place: 'Detalhe', cat: 'cortina', w: 1100, h: 1100 },
  { src: '/images/g08.webp', alt: 'Persiana rolô tela solar', title: 'Rolô tela solar', place: 'Área integrada', cat: 'persiana', w: 619, h: 1100 },
  { src: '/images/g09.webp', alt: 'Cortina no quarto', title: 'Cortina', place: 'Quarto', cat: 'cortina', w: 1100, h: 618 },
  { src: '/images/g10.webp', alt: 'Prega wave com varão', title: 'Prega wave com varão', place: 'Sala de TV', cat: 'cortina', w: 619, h: 1100 },
  { src: '/images/g11.webp', alt: 'Almofadas com estampa de folhagens', title: 'Almofadas', place: 'Folhagens', cat: 'almofada', w: 1024, h: 1024 },
  { src: '/images/g12.webp', alt: 'Cortina para quarto', title: 'Cortina para quarto', place: 'Quarto', cat: 'cortina', w: 768, h: 1024 },
  { src: '/images/g13.webp', alt: 'Persiana horizontal na cozinha', title: 'Persiana horizontal', place: 'Cozinha', cat: 'persiana', w: 1100, h: 1100 },
  { src: '/images/g14.webp', alt: 'Composição com prega franzida', title: 'Prega franzida', place: 'Composição', cat: 'cortina', w: 600, h: 800 },
  { src: '/images/g15.webp', alt: 'Cortina com ilhós na sala de jantar', title: 'Cortina com ilhós', place: 'Sala de jantar', cat: 'cortina', w: 618, h: 1100 },
  { src: '/images/g16.webp', alt: 'Cortinas no salão de jogos', title: 'Salão de jogos', place: 'Área comum', cat: 'cortina', w: 618, h: 1100 },
  { src: '/images/g17.webp', alt: 'Cortina clara no quarto', title: 'Cortina', place: 'Quarto', cat: 'cortina', w: 618, h: 1100 },
  { src: '/images/g18.webp', alt: 'Almofadas em linho e couro', title: 'Almofadas', place: 'Linho e couro', cat: 'almofada', w: 894, h: 894 },
  { src: '/images/g19.webp', alt: 'Cortina branca no quarto', title: 'Cortina', place: 'Quarto', cat: 'cortina', w: 618, h: 1100 },
]

/**
 * Antes e depois. Quando as fotos reais chegarem, coloque-as em /public/images/antes-depois/
 * e preencha "before" e "after". Enquanto "before" estiver vazio, o site mostra uma simulação
 * identificada como tal.
 */
export const beforeAfter: {
  title: string
  place: string
  before?: string
  after: string
}[] = [
  { title: 'Cortina em voil', place: 'Quarto', after: '/images/hero.webp' },
  { title: 'Prega franzida', place: 'Sala de estar', after: '/images/about.webp' },
  { title: 'Almofadas decorativas', place: 'Living', after: '/images/almofada-main.webp' },
]

/** Depoimentos reais, publicados com autorização. A seção aparece quando houver ao menos um. */
export const testimonials: { quote: string; name: string; place: string }[] = []

export const faqs = [
  {
    q: 'Vocês buscam e entregam as peças?',
    a: 'Sim. Depois do orçamento, combinamos o melhor dia para buscar as peças e devolvemos tudo limpo e pronto para usar.',
  },
  {
    q: 'Quanto tempo leva a limpeza?',
    a: 'O prazo depende da quantidade e do tipo de peça. Ele é informado já no orçamento, antes de qualquer compromisso.',
  },
  {
    q: 'A cortina pode encolher ou desbotar?',
    a: 'Cada peça é avaliada antes da limpeza e tratada de acordo com o tecido e o modelo, justamente para preservar a cor, o tamanho e o caimento.',
  },
  {
    q: 'Quais tecidos vocês lavam?',
    a: 'Voil, linho, blackout e tecidos mistos, além de persianas de tecido, tela e lâminas, e almofadas decorativas.',
  },
  {
    q: 'Como é feito o orçamento?',
    a: 'É só enviar fotos ou a quantidade de peças pelo WhatsApp ou pelo formulário do site. Respondemos com o valor sem compromisso.',
  },
  {
    q: 'Quais regiões vocês atendem?',
    a: 'Fale com a gente pelo WhatsApp informando seu bairro e cidade para confirmarmos o atendimento.',
  },
]
