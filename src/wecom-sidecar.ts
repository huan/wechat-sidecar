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
  Sidecar,
  SidecarBody,
  Call,
  Hook,
  ParamType,
  RetType,
  Ret,

  agentTarget,
}                 from 'frida-sidecar'

import fs from 'fs'

const initAgentScript = fs.readFileSync(require.resolve(
  './init-agent-script.js'
)).toString()

@Sidecar('WXWork.exe', initAgentScript)
class WeComSidecar extends SidecarBody {

  @Call(agentTarget('agentSendMsg'))
  @RetType('void')
  sendMsg (
  // @ParamType('pointer', 'Utf16String') contactId: string,
  // @ParamType('pointer', 'Utf16String') text: string,
  ): Promise<void> { return Ret() }

  @Hook(agentTarget('agentRecvMsgNativeCallback'))
  recvMsg (
    @ParamType('pointer', 'Utf16String') contactId: string,
    @ParamType('pointer', 'Utf16String') text: string,
  ) { return Ret(contactId, text) }

}

export { WeComSidecar }
