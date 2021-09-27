import React from 'react'
import { Transition } from 'react-transition-group'
import styled from 'styled-components'
import Svg from '../components/Svg'
import { Arrow, Container, H3, HeadingTitle, P, Section } from '../styles'

const accodionData = [
  {
    question: 'МЕРЧАНТ ццв',
    answer:
      'Если вы уже всё перепробовали и не можете подобрать мерч, уверенно пишите нам, мы подберём или сделаем на ваш выбор мерч. Наш сервис  предоставляет скидку 50% на тестовые аккаунты.',
  },
  {
    question: 'Аренда обнал',
    answer:
      'Аренда или же прием средств проходит таким образом: Аренда только СНГ банков, после того как вы проверили личный кабинет, оператор составляет договор и передаёт с полным доступом личный кабинет. После того как получили доступ, обеспечьте безопасность с помощью смены пароля или же воспользуйтесь услугами различных аундификаторов, дабы избежать проникновения в ваш личный кабинет кем то чужим. Прием средств происходит аналогичным способом, ибо же это делает оператор-специалист.',
  },
  {
    question: 'Создание сайтов и софтов ботов',
    answer:
      'Вам нужен качественный сайт недорого? Пишите нам и мы под ваш вкус сделаем вам сайт, которым вы будете наслаждаться и разделять это наслаждение с другими посетителями вашего будущего сайта. Тоже самое относится и к созданию ботов и софтов. Боты для шопов сдаются в аренду',
  },
  {
    question: 'Фотошоп, лого',
    answer:
      'Не можете пройти верификацию карты, либо же вы не можете вытянуть с жадного брокера деньги, ибо он требует конкретную выписку или справку, пишите нам, мы сделаем любой подобный матириал для получения желаемых средств. Для более подробной информации, пишите пожалуйста оператору. Так же мы создадим необычный логотип для вашей компании ( С этой услугой вам предлагается уже готовый сайт к конкретному логотипу, а так же HR - Менеджер )',
  },
  {
    question: 'Создание магазина и нр менеджер',
    answer:
      'У вас нету времени, либо же вы просто не хотите этим заниматься, пишите нам и мы это сделаем за вас, сделаем это качественно. Под ваш дизайн или же наш креативный подбор мы сделаем для вас магазин ( сервис ). Что входит в покупке с Магазином ? Все то что нужно для старта и продвижения данного магазина ( сервиса ), до этой услуги предоставляется HR - менеджер для найма и контроля за работой и персоналом в целом, при этом ваша ответственность за персонал перед нашим сервисом который в случае гарантирует исключение неприятных инцидентов по персоналу, для более подробной информации, пишите оператору-специалисту.',
  },
]

const StyledFaq = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
const AccordionSection = styled.div`
  width: 100%;
`

const Accordion = styled.div`
  margin: 40px 0;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.palette?.bg.secondary};
  box-shadow: 0px 2px 14px 3px rgba(34, 60, 80, 0.2);
  transition: all 0.3s ease-in-out;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints?.sm}) {
    margin: 20px 0;
  }
`

const AccordionTrigger = styled.div<{ active?: boolean }>`
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  h3 {
    color: ${({ active, theme }) => active && theme.palette?.primary};
  }
`

const AccordionContent = styled.div`
  padding: 20px;
`

const FaqIllustration = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`

const Faq = () => {
  const [isOpen, setOpen] = React.useState<number | null>(null)
  const [accHeight, setAccHeight] = React.useState<number | undefined>(undefined)

  const onToggle = (inx: number) => {
    if (isOpen === inx) {
      return setOpen(null)
    }
    setOpen(inx)
  }

  const calcHeight = (el: HTMLElement) => {
    if (el) {
      const height = el.scrollHeight
      setAccHeight(height)
    }
  }

  const duration = 300

  const defaultStyle = {
    transition: `height ${duration}ms ease-in-out`,
    height: '0px',
    overflow: 'hidden',
  }

  const transitionStyles: any = {
    entering: { overflow: 'hidden', height: accHeight + 'px' },
    entered: { overflow: 'visible', height: accHeight + 'px' },
    exiting: { overflow: 'hidden', height: '0px' },
    exited: { overflow: 'hidden', height: '0px' },
  }

  return (
    <StyledFaq id='faq'>
      <Container>
        <FaqIllustration>
          <Svg type='faq' />
        </FaqIllustration>
        <HeadingTitle mb='40'>Часто задаваемые вопросы</HeadingTitle>
        <AccordionSection>
          {accodionData.map((item, inx) => (
            <Accordion key={`accordion-${inx}`}>
              <AccordionTrigger active={isOpen === inx} onClick={() => onToggle(inx)}>
                <H3>{item.question}</H3>
                <Arrow style={{ marginLeft: '20px' }} isOpen={isOpen === inx} />
              </AccordionTrigger>

              <Transition in={isOpen === inx} unmountOnExit timeout={duration} onEnter={calcHeight}>
                {(state) => (
                  <div
                    style={{
                      ...defaultStyle,
                      ...transitionStyles[state],
                    }}
                  >
                    <AccordionContent>
                      <P>{item.answer}</P>
                    </AccordionContent>
                  </div>
                )}
              </Transition>
            </Accordion>
          ))}
        </AccordionSection>
      </Container>
    </StyledFaq>
  )
}

export default Faq
