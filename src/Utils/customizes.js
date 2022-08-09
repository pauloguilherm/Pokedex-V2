export const getStatistcs = (stats) => {
    return stats?.map((stat)=> (
        {name: stat?.stat?.name, status: stat?.base_stat }
    ));
};

export const getType = (data) => {
    return data?.types?.map((pokeType)=> (
        pokeType.type.name
    ))
};

export const getTypeColor = (types) => {
    switch(types[0]) {
        case 'normal':
            return '#0674c1ba';
        case 'fighting':
            return '#661212d4';
        case 'flying':
            return '#4ca129bf';
        case 'poison':
            return '#7539a3ad';
        case 'ground':
            return '#726969';
        case 'rock':
            return '#A9A9A9';
        case 'bug':
            return '#4ca129bf';
        case 'ghost':
            return '#D1E4FF';
        case 'steel':
            return '#D3D3D3';
        case 'fire':
            return '#b10e0ec7';
        case 'water':
            return '#54e7e0';
        case 'grass':
            return '#4ba526d6';
        case 'electric':
            return '#EEDD82';
        case 'psychic':
            return '#D1E4FF';
        case 'ice':
            return '#6a9fc5';
        case 'dragon':
            return '#D1E4FF';
        case 'dark':
            return '#3a3a3a';
        case 'fairy':
            return '#c16fa4';
        default:
            return '#D3D3D3';
    }
};