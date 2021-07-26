/**
 *   Sidecar - https://github.com/huan/sidecar
 *
 *   @copyright 2021 Huan LI (李卓桓) <https://github.com/huan>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */
import {
  attach,
  detach,
}           from 'frida-sidecar'

import { MessageBoxSidecar } from './message-box-sidecar'

async function main () {
  console.log('MessageBox Sidecar starting...')

  const sidecar = new MessageBoxSidecar()
  await attach(sidecar)

  console.log('MessageBox Sidecar started.')
  const ret = await sidecar.messageBox(null, 'Content: 提示框内容', 'Title: 标题', 1)
  console.log('MessageBox Ret:', ret)

  console.log('Sidecar detaching...')
  await detach(sidecar)
}

main()
  .catch(console.error)
