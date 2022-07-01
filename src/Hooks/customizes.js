export const getStatistcs = (stats) => {
    const pokeStatistic = stats?.map((stat)=> (
        {name: stat?.stat?.name, status: stat?.base_stat }
    ));
    return pokeStatistic;
};

export const getType = (data) => {
    let type = data?.types?.map((pokeType)=> (
        pokeType.type.name
    ))
    return type;
};

export const getTypeColor = (types) => {
    switch(types[0]) {
        case 'normal':
            return '#0174C5';
        case 'fighting':
            return '#FFD1D1';
        case 'flying':
            return '#B5E1F7';
        case 'poison':
            return '#EEDD82';
        case 'ground':
            return '#D3D3D3';
        case 'rock':
            return '#A9A9A9';
        case 'bug':
            return '#DEFFDE';
        case 'ghost':
            return '#D1E4FF';
        case 'steel':
            return '#D3D3D3';
        case 'fire':
            return '#FFD1D1';
        case 'water':
            return '#6a9fc5';
        case 'grass':
            return '#DEFFDE';
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
            return '#EEDD82';
        default:
            return '#D3D3D3';
    }
};