import { Fragment, type ReactNode } from 'react';

/**
 * 문구 속 \n을 <br />로 바꾼다.
 * whitespace-pre-line은 SplitText가 줄을 나누면서 줄바꿈을 잃어버려서, 글자 애니메이션을 거는 제목은 이걸 쓴다.
 */
export function withBreaks(text: string): ReactNode {
  return text.split('\n').map((part, i) => (
    <Fragment key={part}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ));
}
