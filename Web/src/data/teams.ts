import { Team, TeamId } from '@/types';

export const teams: Record<TeamId, Team> = {
  A: {
    id: 'A',
    name: '猛虎队',
    logo: 'A', // 暂用字母，后续可替换为实际图片路径
    captain: '张三丰',
    members: ['李四', '王五', '赵六', '孙七', '周八', '吴九'],
    theme: {
      primary: 'blue-600',
      gradient: 'from-blue-500 to-blue-700',
      shadow: 'shadow-blue-500/20',
      textAccent: 'text-blue-400',
    },
  },
  B: {
    id: 'B',
    name: '雄鹰队',
    logo: 'B',
    captain: '风清扬',
    members: ['令狐冲', '岳灵珊', '林平之', '任盈盈', '向问天', '蓝凤凰'],
    theme: {
      primary: 'cyan-600',
      gradient: 'from-cyan-500 to-cyan-700',
      shadow: 'shadow-cyan-500/20',
      textAccent: 'text-cyan-400',
    },
  },
  C: {
    id: 'C',
    name: '猎豹队',
    logo: 'C',
    captain: '杨过',
    members: ['小龙女', '郭芙', '郭襄', '耶律齐', '陆无双', '程英'],
    theme: {
      primary: 'purple-600',
      gradient: 'from-purple-500 to-purple-700',
      shadow: 'shadow-purple-500/20',
      textAccent: 'text-purple-400',
    },
  },
  D: {
    id: 'D',
    name: '战狼队',
    logo: 'D',
    captain: '郭靖',
    members: ['黄蓉', '柯镇恶', '朱聪', '韩宝驹', '南希仁', '全金发'],
    theme: {
      primary: 'rose-600',
      gradient: 'from-rose-500 to-rose-700',
      shadow: 'shadow-rose-500/20',
      textAccent: 'text-rose-400',
    },
  },
};

// 获取指定战队信息
export function getTeam(id: TeamId): Team {
  return teams[id];
}

// 获取所有战队（数组形式）
export function getAllTeams(): Team[] {
  return Object.values(teams);
}

